
import {
  prettier,
  prettierPlugins
} from "https://denolib.com/denolib/prettier/prettier.ts";
import {
  ensureDir,
  ensureFile,
} from "https://deno.land/std/fs/mod.ts";

//up here we need to put all our cute little defualt imports for all files...
//import * as serverImports from "./put server deps import file here"
import { importString, setUp, fetchHandler } from "./Imports/importsForServer.ts"
import { CRUDFunctionGet, CRUDFunctionGetOne, CRUDFunctionPatch, CRUDFunctionCreateOne, CRUDFunctionDelete } from  "./CRUDFunctions.ts"
import { mongooseString } from "./Imports/importsForMongo.ts"


export const configureApplication = async (
  dir, 
  applicationName,
  mongoHostState, 
  userNameState, 
  passWordState, 
  mongoDBState, 
  collectionsState, 
  dockerFile, 
  dockerComposeFile
  ) => {
      

  // here we ensure the file structure for export includes a working directory based on the application name entered at the beginning of the project
  // a sever folder subjugated to the top level working directory which will contain:
  // a mod.ts file (the sever itself)
  // a models file which will contain the shcmeas entered by the user as well as the necessary connections to the Mongo Atlas DB
  // a router folder which will contain the proper middleware functionality for CRUD functionality
  // sub router files for each schema produced.

  await ensureDir(`${dir}/${applicationName}`)
  await ensureDir(`${dir}/${applicationName}/Server`)
  await ensureFile(`${dir}/${applicationName}/Server/deps.ts`);
  await ensureFile(`${dir}/${applicationName}/Server/server.ts`)
  await ensureDir(`${dir}/${applicationName}/Server/models`)
  await ensureDir(`${dir}/${applicationName}/Server/Routes`)
  await ensureFile(`${dir}/${applicationName}/Server/Routes/Router.ts`)

  await ensureDir(`${dir}/${applicationName}/Controllers/`)

  await ensureDir(`${dir}/${applicationName}/client`);
  await ensureFile(`${dir}/${applicationName}/client/deps.ts`);

  await ensureFile(`${dir}/${applicationName}/DockerFile`);
  await Deno.writeTextFile(`${dir}/${applicationName}/DockerFile`, dockerFile)

  await ensureFile(`${dir}/${applicationName}/docker-compose.yml`);
  await Deno.writeTextFile(`${dir}/${applicationName}/docker-compose.yml`, dockerComposeFile)

  
  let controllerImportString: string[] = []

  const createModelsDir =  async (obj) => {
      // here we iterate through our current schemas and for each of them ensure a file in the newly created user folder /router 
      const models = Object.keys(obj)
   
      let mongooseConnectionFileIsCreated: boolean = false

      const prettyConnection =  prettier.format(await mongooseString(
          mongoHostState, 
          userNameState, 
          passWordState, 
          mongoDBState
          ), {
          parser: "babel",
          plugins: prettierPlugins
        });

      for(let i = 0; i < models.length; i++){
          //here we delcare an empty string whcih will hold our shcema's properties
          let schemaValues +='';
          const model = models[i]

          if(mongooseConnectionFileIsCreated){
              await ensureFile(`${dir}/${applicationName}/Server/models/${model}.ts`)
              const write = Deno.writeTextFile(`${dir}/${applicationName}/Server/models/DBConnection.ts`, prettyConnection)
              write.then(() => console.log(`Mongoose Connection File Written to ${dir}/${applicationName}/Server/models/DBConnection.ts`))
          } else {
              await ensureFile(`${dir}/${applicationName}/Server/Models/DBConnection.ts`)
              const write = Deno.writeTextFile(`${dir}/${applicationName}/Server/Models/DBConnection.ts`, prettyConnection)
              write.then(() => console.log(`Mongoose Connection File Written to ${dir}/${applicationName}/Server/models/DBConnection.ts`))
              mongooseConnectionFileIsCreated = true
              await ensureFile(`${dir}/${applicationName}/Server/models/${model}.ts`)
          }

          //here we need to iterate through each of the mdodels to get their properties
          obj[model].forEach((modelInput) =>{
            schemaValues += `${String(modelInput)}\n`
          })

          const schemaTemplateString = `import { MongoClient } from '../deps.ts'
import { client } from './DBConnection.ts'

interface ${model}{
    ${schemaValues}
}

const db = await client.database(${mongoDBState})
const ${model} = await db.collection("${model}")

export { ${model} };
          `

          const PretySchema = prettier.format(schemaTemplateString, {
              parser: "babel",
              plugins: prettierPlugins
          })

          const writeSchema = async() => await Deno.writeTextFile(`${dir}/${applicationName}/Server/models/${model}.ts`,schemaTemplateString);
          writeSchema().then(() => console.log(`Schema file for ${model} succesfully wirtten to ${dir}/${applicationName}/Server/Models/${model}.ts`))
          
      }
  }

    const createControllerFiles = async (obj) => {
        const models = Object.keys(obj)

        for(let i = 0; i < models.length; i++){
            let controllerFileString = ''
            const model = models[i]

            const flatModel = obj[model].flat()
            const props = flatModel.reduce((acc, property) => {

                acc += `${property}`
                return acc

            }, '')

            //CRUDFunctionGet, CRUDFunctionGetOne, CRUDFunctionPatch, CRUDFunctionCreateOne, CRUDFunctionDelete 
            const getAllCRUD: string = await CRUDFunctionGet(model)
            const getOneCRUD: string = await CRUDFunctionGetOne(model)
            const createCRUD: string = await CRUDFunctionCreateOne(model)
            const updateCRUD: string = await CRUDFunctionPatch(model, props)
            const deleteCRUD: string = await CRUDFunctionDelete(model)

            controllerFileString += `${getAllCRUD}, ${getOneCRUD}, ${createCRUD}, ${updateCRUD}, ${deleteCRUD}`
            controllerImportString.push(`import {get${model}, getAll${model}, create${model}, update${model}, delete${model}} from "./Controllers/${model}Controller.ts`)

            const prettyController = prettier.format(controllerFileString, {
                parser: "babel",
                plugins: prettierPlugins
            })

        
            await ensureFile(`${dir}/${applicationName}/Controllers/${model}Controller.ts`)
            const write = Deno.writeTextFile(`${dir}/${applicationName}/Controllers/${model}Controller.ts`, prettyController)
            write.then(() => console.log(`controller File for ${model} Successfully Written to ${dir}/${applicationName}/Controllers/${model}Controller.ts`))
        }

    }

    const createServerFiles = async (obj) => {
        

        let template: string = ''
        let routerString: string = ''
        const models = Object.keys(obj)

        for(let i = 0; i < models.length; i++){
            const model = models[i]

            const route = `router.get("/${model}", getAll${model})
                .get("/${model}/:id", get${model}
                .post("/${model}", create${model})
                .patch("/${model}/:id, update${model})
                .delete("${model}/:id, delete${model})`

                routerString += `${route}\n`
        }

        template += importString
        controllerImportString.forEach(el => {
            template += el
        })
        template += setUp
        template += routerString
        template += fetchHandler

        Deno.writeTextFile(`${dir}/${applicationName}/Server/server.ts`, template)

    }
  
   await createModelsDir(collectionsState);
   await createControllerFiles(collectionsState);
   await createServerFiles(collectionsState)
}



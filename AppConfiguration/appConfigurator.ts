
import {
  prettier,
  prettierPlugins
} from "https://denolib.com/denolib/prettier/prettier.ts";
import {
  ensureDir,
  ensureFile,
} from "https://deno.land/std/fs/mod.ts";

import { importString, setUp, fetchHandler } from "./Imports/importsForServer.ts"
import { CRUDFunctionGet, CRUDFunctionGetOne, CRUDFunctionPatch, CRUDFunctionCreateOne, CRUDFunctionDelete } from  "./CRUDFunctions.ts"
import { mongooseString } from "./Imports/importsForMongo.ts"
import { routerString, exportString } from "./Imports/ImportsForrouter.ts"


export const configureApplication = async (
  dir, 
  applicationName,
  mongoHostState, 
  userNameState, 
  passWordState, 
  mongoDBState, 
  collectionsState, 
  dockerFile, 
  dockerComposeFile,
  routes
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
  await ensureFile(`${dir}/${applicationName}/Server/mods.ts`)
  await ensureDir(`${dir}/${applicationName}/Server/Models`)
  await ensureDir(`${dir}/${applicationName}/Server/Routes`)
  await ensureFile(`${dir}/${applicationName}/Server/Routes/router.ts`)
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
          let schemaValues = '';
          const model = models[i]

          if(mongooseConnectionFileIsCreated){
              await ensureFile(`${dir}/${applicationName}/Server/models/${model}.ts`)
              const write = Deno.writeTextFile(`${dir}/${applicationName}/Server/Models/DBConnection.ts`, prettyConnection)
              write.then(() => console.log(`Mongoose Connection File Written to ${dir}/${applicationName}/Server/models/DBConnection.ts`))
          } else {
              await ensureFile(`${dir}/${applicationName}/Server/Models/DBConnection.ts`)
              const write = Deno.writeTextFile(`${dir}/${applicationName}/Server/Models/DBConnection.ts`, prettyConnection)
              write.then(() => console.log(`Mongoose Connection File Written to ${dir}/${applicationName}/Server/Models/DBConnection.ts`))
              mongooseConnectionFileIsCreated = true
              await ensureFile(`${dir}/${applicationName}/Server/models/${model}.ts`)
          }

          //here we need to iterate through each of the mdodels to get their properties
          obj[model].forEach((modelInput,index) =>{
            schemaValues += `${String(modelInput)}`;
          })

          const schemaTemplateString = `import { Bson, Router, helpers } from '../deps.ts';
            import { client } from './DBConnection.ts'

            interface ${model}{
                ${schemaValues}
            }

            const db = await client.database("${mongoDBState}")`

          const prettySchema = prettier.format(schemaTemplateString, {
              parser: "babel",
              plugins: prettierPlugins
          })

          const writeSchema = async() => await Deno.writeTextFile(`${dir}/${applicationName}/Server/models/${model}.ts`,`${prettySchema}\nconst ${model} = await db.collection<${model}>("${model}")\n
          export { ${model} };`);
          writeSchema().then(() => console.log(`Schema file for ${model} succesfully wirtten to ${dir}/${applicationName}/Server/Models/${model}.ts`))
          
      }
  }

    const createControllerFiles = async (obj) => {
                //for building base CRUD functions if none are selected from front end...still needs to be implemented as a feature on the fornt end..

        const models = Object.keys(obj)

        for(let i = 0; i < models.length; i++){
            let controllerFileString = ''
            const model = models[i]

            const flatModel = obj[model].flat()
            const props = flatModel.reduce((acc, property) => {
                property = property.slice(0, property.indexOf(":"))
                acc += `${property}, `
                return acc

            }, '')

            //CRUDFunctionGet, CRUDFunctionGetOne, CRUDFunctionPatch, CRUDFunctionCreateOne, CRUDFunctionDelete 
            const getAllCRUD: string = await CRUDFunctionGet(model)
            const getOneCRUD: string = await CRUDFunctionGetOne(model)
            const createCRUD: string = await CRUDFunctionCreateOne(model, props)
            const updateCRUD: string = await CRUDFunctionPatch(model, props)
            const deleteCRUD: string = await CRUDFunctionDelete(model)

            controllerFileString += `${getAllCRUD}; ${getOneCRUD}; ${createCRUD}; ${updateCRUD}; ${deleteCRUD}`
            controllerImportString.push(`import {get${model}, getAll${model}, create${model}, update${model}, delete${model}} from "./Controllers/${model}Controller.ts"\n`)

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

        let routerCount = 0
        for(let i = 0; i < models.length; i++){
            const model = models[i]

            if(routerCount < 1){
            const route = `router.get("/${model}", getAll${model})
                .get("/${model}/:id", get${model})
                .post("/${model}", create${model})
                .patch("/${model}/:id", update${model})
                .delete("${model}/:id", delete${model})`

                routerString += `${route}`
                routerCount++
            } else {
                const route = `.get("/${model}", getAll${model})
                .get("/${model}/:id", get${model})
                .post("/${model}", create${model})
                .patch("/${model}/:id", update${model})
                .delete("${model}/:id", delete${model})
                `
                routerString += `${route}`
                routerCount++
            }
        }

        template += importString
        // controllerImportString.forEach(el => {
        //     template += el
        // })
        template += setUp
        template += fetchHandler

        const prettyServer = prettier.format(template, {
            parser: "babel",
            plugins: prettierPlugins
        })

        const write = Deno.writeTextFile(`${dir}/${applicationName}/Server/mods.ts`, prettyServer)
        write.then(() => console.log(`server file succesfully written to ${dir}/${applicationName}/Server/mods.ts`))

    }

    const createRouteFile = async (routes, collectionsState) => {
        const models:Array<string> = Object.keys(collectionsState)
        let modelImport: string = ''
        for(let i = 0; i < models.length; i++){
            modelImport += `import { ${models[i]} } from '../Models/${models[i]}.ts';\n`;
        }

        let routeTemplateStr: string =`import { Bson, Router, helpers } from '../deps.ts';
            ${modelImport}
            const router = new Router()
            router`
        for (let i = 0; i < routes.length; i++){
            routeTemplateStr += '\n\t' + routes[i];
        }
        routeTemplateStr += ';';
        routeTemplateStr += `export { router };`;

    
        let serverDepsTemplateStr: string =`export { Application, Router, helpers  } from "https://deno.land/x/oak/mod.ts";
            export { MongoClient, Bson } from "https://deno.land/x/mongo/mod.ts";
                    `;

        const prettyRouter = prettier.format(routeTemplateStr, {
            parser: "babel",
            plugins: prettierPlugins
        })
        

        const prettyServerDeps = prettier.format(serverDepsTemplateStr, {
            parser: "babel",
            plugins: prettierPlugins
        })


        const writeRoute = Deno.writeTextFile(`${dir}/${applicationName}/Server/Routes/router.ts`, routeTemplateStr);
        writeRoute.then(() => {console.log(`Router file successfully written to ${dir}/${applicationName}/Server/Routes/router.ts `)})

        const writeServerDeps = Deno.writeTextFile(`${dir}/${applicationName}/Server/deps.ts`, prettyServerDeps);
        writeServerDeps.then(() => {console.log(`Sever Deps File successfully written to ${dir}/${applicationName}/Server/deps.ts`)})
    }

  
   await createModelsDir(collectionsState);
   //await createControllerFiles(collectionsState);
   await createServerFiles(collectionsState);
   await createRouteFile(routes, collectionsState);
}



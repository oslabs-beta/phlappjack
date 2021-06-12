const fs = require('fs-extra')
// import * as fs from "https://deno.land/std@0.83.0/fs/mod.ts";
// import { prettier, prettierPlugins } from "https://denolib.com/denolib/prettier/prettier.ts";
// import { config } from 'https://deno.land/x/dotenv/mod.ts';
// await config({export: true});

// const state = {
//   applicationName:"TEST",
//   mongoHostState:"cluster0-shard-00-01.tiosa.mongodb.net",
//   userNameState:"dbUser",
//   passWordState:"dbPassword",
//   mongoDBState:"sample_airbnb",
//   collectionsState:{
//     "users0":["userName0: String;","passWord0: String;","isAdmin0: Boolean;"],
//     "users1":["userName1: String;","passWord1: String;","isAdmin1: Boolean;"],
//     "users2":["userName2: String;","isAdmin: Boolean;"],
//     "users3":["someUserName: String;","somePassword: String;"]
//   }
// };

// const { applicationName,mongoHostState,userNameState,passWordState,mongoDBState,collectionsState } = state;

const AppConfigurator = async ( dir, applicationName ,mongoHostState ,userNameState ,passWordState ,mongoDBState ,collectionsState, dockerFile, dockerComposeFile ) => {

  const clientDepsTSTemplate =`export { MongoClient } from "https://deno.land/x/mongo/mod.ts";
    
  export { Application } from "https://deno.land/x/oak/mod.ts";
    `
  //Create application folder.
  await fs.ensureDir(`${dir}/${applicationName}`);
  //Create server folder within the new application folder.
  await fs.ensureDir(`${dir}/${applicationName}/server`);
  //Create server.ts file in the new server folder.
  await fs.ensureFile(`${dir}/${applicationName}/server/server.ts`);
  //Create server template that will populate the server.ts file.
  clientServerTSTemplate =`import { Application } from './deps.ts'
  import { router } from './router/routes.ts'
  
const app = new Application();
const port: number = 3000;

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port });
  `
  //Popualte server.ts file with clientServerTSTemplate.
  await fs.writeFileSync(`${dir}/${applicationName}/server/server.ts`,clientServerTSTemplate);
  //Create a router dirrectory.
  await fs.ensureDir(`${dir}/${applicationName}/server/router`);
  //Create a routes.ts file in the newly created router folder.
  await fs.ensureFile(`${dir}/${applicationName}/server/router/routes.ts`);
  //Create server template that will populate the server.ts file.
  clientRouterTSTemplate =`import { Router } from '../deps.ts'
const router = new Router()

router
    `
  //Write clientRouterTSTemplate to newly create routes.ts file.
  await fs.writeFileSync(`${dir}/${applicationName}/server/router/routes.ts`,clientRouterTSTemplate);

  //Create deps.ts file in the new server folder.
  await fs.ensureFile(`${dir}/${applicationName}/server/deps.ts`);
  //Write to deps.ts file in the server folder.
  await fs.writeFileSync(`${dir}/${applicationName}/server/deps.ts`,clientDepsTSTemplate);
  //Create a models folder within the new server folder.
  await fs.ensureDir(`${dir}/${applicationName}/server/models`);

  const databases  = Object.keys(collectionsState);
  for(let i = 0; i < databases.length; i++){
    
    let schemaInputFields = '';
    let tab = '\t';
    collectionsState[databases[i]].forEach((inputField) =>{
      schemaInputFields += '\t' + String(inputField) + '\n';
    })

    let databaseConnectionTemp =`import { MongoClient } from '../deps.ts'
const client = new MongoClient();

await client.connect({
  tls: true,
  db:'',
  servers: [
    {
      host: "${mongoHostState}",
      port: 27017,
    },
  ],
  credential: {
    username: "${userNameState}",
    password: "${passWordState}",
    db: "${mongoDBState}",
    mechanism: "SCRAM-SHA-1",
  },
});

interface ${databases[i]}{
  ${schemaInputFields.trim()}
}

const db = await client.database("${mongoDBState}");
const ${databases[i]} = await db.collection("${databases[i]}");

${databases[i]}.prototype.insert = (inputFields) =>{
  await ${databases[i]}.insertOne(inputFields);
};

${databases[i]}.prototype.insertMany = (inputFieldsArr) =>{
  await ${databases[i]}.insertMany(inputFieldsArr);
};

console.log('Successfully connected to ${databases[i]}!')
      `
    //Create a models.ts files within the new models folder.
    await fs.ensureFile(`${dir}/${applicationName}/server/models/${databases[i]}.ts`);

    //Write template to the new models folder.
    fs.writeFileSync(`${dir}/${applicationName}/server/models/${databases[i]}.ts`, databaseConnectionTemp)
  }

  //Create a client folder.
  await fs.ensureDir(`${dir}/${applicationName}/client`);
  //Create deps.ts file in the new server folder.
  await fs.ensureFile(`${dir}/${applicationName}/client/deps.ts`);

  //Create DockerFile in new application root folder.
  await fs.ensureFile(`${dir}/${applicationName}/DockerFile`);
  //Populate DockerFile
  fs.writeFileSync(`${dir}/${applicationName}/DockerFile`, dockerFile)

  //Create docker-compose.yml in new application root folder.
  await fs.ensureFile(`${dir}/${applicationName}/docker-compose.yml`);
  //Populate docker-compose.yml.
  fs.writeFileSync(`${dir}/${applicationName}/docker-compose.yml`, dockerComposeFile)

}

module.exports = AppConfigurator;
// AppConfigurator(applicationName ,mongoHostState,userNameState,passWordState,mongoDBState,collectionsState);
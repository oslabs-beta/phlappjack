import * as fs from "https://deno.land/std@0.83.0/fs/mod.ts";
import {
    prettier,
    prettierPlugins
  } from "https://denolib.com/denolib/prettier/prettier.ts";

import * as schemaBuilder from "./schemaBuilder.ts"


interface PKG {
    schemaInterface: string;
    collectionString: string;
    credential?: string;
    importStr?: string;
    client?: string;
    dbname?: string;
}

interface Person {
    schemaName: string;
    schemaId: number;
    schemaProperties: string[];
  }
  
const data1: Person = {
    schemaName: "bamby",
    schemaId: 12,
    schemaProperties: [
      "username: string",
      "password: string",
      "email: string",
      "age: number",
    ],
};




const newImportStr = `import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts"`
const newClient = `const client = new MongoClient()`
const newDBName =`const db = client.database("${data.db}")`

const interfacePromise = schemaBuilder.createInterface(data1)
const collectionPromise = schemaBuilder.collectionFactory(data1)
const credentialStr = schemaBuilder.credentialFactory(data)

const data: PKG = {
    schemaInterface: interfacePromise,
    collectionString: collectionPromise,
    credential: credentialStr,
    importStr: newImportStr,
    client: newClient,
    dbname: newDBName
}

async function createDir(obj: PKG) {
 

    const template = 
     `${obj.importStr};\n${obj.client};\n${obj.dbname};\n${obj.credential};\n${obj.schemaInterface};`
 
    const pretty =  prettier.format(template, {
        parser: "babel",
        plugins: prettierPlugins
      });
    await fs.ensureDir("./Models")
    await fs.ensureFile("./Models/models.ts")
    Deno.writeTextFile("./Models/models.ts", pretty + '\n' + obj.collectionString+';')

}

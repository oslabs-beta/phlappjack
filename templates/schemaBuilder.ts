import * as fs from "https://deno.land/std@0.83.0/fs/mod.ts";
import * as file from "./constants.ts";
import { envConstructor } from "./envConstructor.ts"

interface Schema {
  schemaName: string;
  schemaId: number;
  schemaProperties: string[];
}

interface Credentials {
    db: string;
    host: string;
    port: number;
    username: string;
    password: string;
 
}

interface envPKG {
    MONGO_HOST: string;
    MONGO_DB: string;
    MONGO_USER: string;
    MONGO_PASS: string;
}

const testPKG: envPKG = {
    MONGO_HOST: "cluster0.yybae.mongodb.net",
    MONGO_DB: "phlappjack",
    MONGO_USER: "dbUser",
    MONGO_PASS: "secret123",
}

export const createInterface = (model: Schema) => {
  const schema = model.schemaName.slice(0, 1).toUpperCase() +
    model.schemaName.slice(1) + "Schema";
  const id = model.schemaId;
  let propString = "";

  model.schemaProperties.forEach((el) => {
    const type = el.slice(el.indexOf(":") + 1);
    const key = el.slice(0, el.indexOf(":") + 1);

    propString += `${key}${type},`;
  });

  const schemaInterface = `interface ${schema} {
    _id: { $oid: string }, ${propString}
  }`;

 return schemaInterface

};


export const collectionFactory = (model: Schema) => {
  const collectionLabel = model.schemaName;
  const lableForExport = model.schemaName.slice(0, 1).toUpperCase() +
    model.schemaName.slice(1) + "Schema";

  const collectionString =
    `const ${collectionLabel} = db.collection<${lableForExport}>("${collectionLabel}")`;

    return collectionString

};

export const credentialFactory = async (model: Credentials) => {
   const { MONGO_HOST, MONGO_DB, MONGO_USER, MONGO_PASS } = await envConstructor(testPKG)

   const url: string = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority`
 
   return url
}
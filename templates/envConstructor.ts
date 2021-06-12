import * as fs from "https://deno.land/std@0.83.0/fs/mod.ts";
import {
    prettier,
    prettierPlugins
  } from "https://denolib.com/denolib/prettier/prettier.ts";

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

export const envConstructor = async (model: envPKG) => {
    let envCluster = ''
    for (const [k, v] of Object.entries(model)){
        envCluster += `${k}=${v}\n`
    }
    await fs.ensureFile('./.env')
    Deno.writeTextFile('./.env', envCluster)
    //return model
}
console.log(envConstructor(testPKG))

// const dbName = Deno.env.get("MONGO_DB");
// const dbUser = Deno.env.get("MONGO_USER");
// const dbPass = Deno.env.get("MONGO_PASS");
// const dbHostname = Deno.env.get("MONGO_HOST");

// const client = new MongoClient();

// const url =
//   `mongodb+srv://${dbUser}:${dbPass}@${dbHostname}/${dbName}?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority`;
// await client.connect(url);
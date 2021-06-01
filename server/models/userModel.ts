import { Bson, MongoClient } from "../../deps.ts";

// set vars from .env file
const dbName = Deno.env.get("MONGO_DB")
const dbUser = Deno.env.get("MONGO_USER")
const dbPass = Deno.env.get("MONGO_PASS")
const dbHostname = Deno.env.get("MONGO_HOST")


const client = new MongoClient();

const url = `mongodb+srv://${dbUser}:${dbPass}@${dbHostname}/${dbName}?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority`
await client.connect(url);

// Defining schema interface
interface UserSchema {
    username: string;
    password: string;
  }

const db = client.database("test");
const users = db.collection<UserSchema>("users");  

await users.insertOne({
    username: "user1",
    password: "pass1",
  });

const dbs = await client.listDatabases();

console.log(dbs)



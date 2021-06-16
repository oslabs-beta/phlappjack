import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface AnotherDB {
  username: string;
  password: string;
}

const db = await client.database("sample_airbnb");
const AnotherDB = await db.collection("AnotherDB");

export { AnotherDB };

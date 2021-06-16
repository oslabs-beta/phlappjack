import { Bson, Router, helpers } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface testDB {
  username: string;
  password: string;
  isAdmin: string;
}

const db = await client.database("sample_airbnb");

const testDB = await db.collection<testDB>("testDB")

          export { testDB };
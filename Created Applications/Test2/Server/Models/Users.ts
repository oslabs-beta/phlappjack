import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface Users {
  username: string;
  password: string;
}

const db = await client.database("sample_airbnb");
const Users = (await db.collection) < Users > "Users";

export { Users };

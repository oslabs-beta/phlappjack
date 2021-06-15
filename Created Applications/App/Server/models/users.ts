import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface users {
  username: string;
  passsword: string;
}

const db = await client.database("sample_airbnb");
const users = await db.collection<users>("users");

export { users };

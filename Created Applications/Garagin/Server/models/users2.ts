import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface users2 {
  usersName2: string;
  password2: string;
}

const db = await client.database(database);
const users2 = await db.collection("users2");

export { users2 };

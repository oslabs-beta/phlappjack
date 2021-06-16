import { Bson, Router, helpers } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface toDos {
  item: string;
  isCompleted: boolean;
}

const db = await client.database("sample_airbnb");

const toDos = await db.collection<toDos>("toDos")

          export { toDos };
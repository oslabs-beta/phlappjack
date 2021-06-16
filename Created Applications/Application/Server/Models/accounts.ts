import { Bson, Router, helpers } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface accounts {
  account_id: number;
  limit: number;
  products: Array<string>;
}

const db = await client.database("sample_analytics");

const accounts = await db.collection<accounts>("accounts")

          export { accounts };
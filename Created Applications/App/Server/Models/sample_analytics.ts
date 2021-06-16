import { Bson, Router, helpers } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface sample_analytics {
  account_id: number;
  limit: number;
  products: Array<string>;
}

const db = await client.database("sample_airbnb");

const sample_analytics = await db.collection<sample_analytics>("sample_analytics")

          export { sample_analytics };
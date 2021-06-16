import { Bson, Router, helpers } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface Posts {
  title: string;
  comments: string[];
}

const db = await client.database("sample_airbnb");

const Posts = await db.collection<Posts>("Posts")

          export { Posts };
import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface Posts {
  image: buffer;
  title: string;
  comments: string[];
}

const db = await client.database("sample_airbnb");
const Posts = (await db.collection) < Posts > "Posts";

export { Posts };

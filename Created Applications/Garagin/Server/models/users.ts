import { MongoClient } from '../deps.ts'
import { client } from './DBConnection.ts'

interface users{
    undefinedusername:  string;
passsword:  string;

}

const db = await client.database(database)
const users = await db.collection("users")

export { users };
          
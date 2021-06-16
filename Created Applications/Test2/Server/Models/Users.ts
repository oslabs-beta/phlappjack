<<<<<<< HEAD:Created Applications/App/Server/models/users.ts
import { MongoClient } from '../deps.ts'
import { client } from './DBConnection.ts'

interface users{
    username:  string;
	passsword:  string;
}

const db = await client.database("sample_airbnb")
const users = await db.collection<users>("users")

export { users };
          
=======
import { MongoClient } from "../deps.ts";
import { client } from "./DBConnection.ts";

interface Users {
  username: string;
  password: string;
}

const db = await client.database("sample_airbnb");
const Users = (await db.collection) < Users > "Users";

export { Users };
>>>>>>> 3ebad38f144b4876617e5c39fec0bc0cf57307a1:Created Applications/Test2/Server/Models/Users.ts

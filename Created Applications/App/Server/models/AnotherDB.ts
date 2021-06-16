import { Bson, Router, helpers } from '../deps.ts';
import { client } from './DBConnection.ts'

interface AnotherDB{
    username:  string;
	passsword:  string;
}

const db = await client.database("sample_airbnb")
const AnotherDB = await db.collection<AnotherDB>("AnotherDB")

export { AnotherDB };
          
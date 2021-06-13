import { MongoClient } from '../deps.ts'
import * as Documnet from "https://cdn.skypack.dev/bson";
const client = new MongoClient();

await client.connect({
  tls: true,
  db:'',
  servers: [
    {
      host: "cluster0-shard-00-01.tiosa.mongodb.net",
      port: 27017,
    },
  ],
  credential: {
    username: "dbUser",
    password: "dbPassword",
    db: "sample_airbnb",
    mechanism: "SCRAM-SHA-1",
  },
});

interface new_Model{
  _id: { $oid: string };
  username:string;
	password:string;
}

const db = await client.database("sample_airbnb");
const new_Model = await db.collection("new_Model");

type insert = Promise<{ insertedIds: Document[]; insertedCount: number; }>

new_Model.insert = async function (inputFields: Document[]){
  await new_Model.insertOne(inputFields)
    // .then((data: any,err: any) =>{
    //   if(err) return console.log(err);
    //   else return console.log(data);
    // })
};

// new_Model.insertMany = async (inputFieldsArr: any) =>{
//   await new_Model.insertMany(inputFieldsArr);
// };

console.log('Successfully connected to new_Model!')

new_Model.insert({'username': 123,'password':'password123'})

      
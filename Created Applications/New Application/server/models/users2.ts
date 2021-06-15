import { MongoClient } from '../deps.ts'
const client = new MongoClient();

await client.connect({
  tls: true,
  db:'',
  servers: [
    {
      host: "",
      port: 27017,
    },
  ],
  credential: {
    username: "",
    password: "",
    db: "",
    mechanism: "SCRAM-SHA-1",
  },
});

interface users2{
  
}

const db = await client.database("");
const users2 = await db.collection("users2");

console.log('Successfully connected to users2!')
      
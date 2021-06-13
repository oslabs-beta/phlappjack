import { MongoClient } from '../deps.ts'
const client = new MongoClient();

await client.connect({
  tls: true,
  db:'',
  servers: [
    {
      host: "hostcluster",
      port: 27017,
    },
  ],
  credential: {
    username: "username",
    password: "password",
    db: "database",
    mechanism: "SCRAM-SHA-1",
  },
});

interface model{
  k1:  v1;
	ghjghj:  ghjgj;
	ghjg:  gjhg;
}

const db = await client.database("database");
const model = await db.collection("model");

console.log('Successfully connected to model!')
      
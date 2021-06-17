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

interface tasks{
  id:  number;
	item:  string;
}

const db = await client.database("");
const tasks = await db.collection("tasks");

tasks.prototype.insert = (inputFields) =>{
  await tasks.insertOne(inputFields);
};

tasks.prototype.insertMany = (inputFieldsArr) =>{
  await tasks.insertMany(inputFields);
};


console.log('Successfully connected to tasks!')
      
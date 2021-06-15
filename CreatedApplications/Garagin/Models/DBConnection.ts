import { MongoClient } from "../deps.ts";
const client = new MongoClient();

await client.connect({
  tls: true,
  db: "",
  servers: [
    {
      host: "hostcluster",
      port: 27017
    }
  ],
  credential: {
    username: "",
    password: "password",
    db: "database",
    mechanism: "SCRAM-SHA-1"
  }
});

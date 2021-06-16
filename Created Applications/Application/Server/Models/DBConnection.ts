import { MongoClient } from "../deps.ts";
const client = new MongoClient();

await client.connect({
  tls: true,
  db: "",
  servers: [
    {
      host: "cluster0-shard-00-01.tiosa.mongodb.net",
      port: 27017
    }
  ],
  credential: {
    username: "dbUser",
    password: "dbPassword",
    db: "sample_analytics",
    mechanism: "SCRAM-SHA-1"
  }
});

export { client };

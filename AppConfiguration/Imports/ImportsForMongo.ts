


export const mongooseString = (mongoHostState ,userNameState ,passWordState ,mongoDBState) => {

    return `import { MongoClient } from '../deps.ts'
    const client = new MongoClient();

    
    const dbName = Deno.env.get("MONGO_DB");
    const dbUser = Deno.env.get("MONGO_USER");
    const dbPass = Deno.env.get("MONGO_PASS");
    const dbHostname = Deno.env.get("MONGO_HOST");
    
    await client.connect({
      tls: true,
      db:'',
      servers: [
        {
          host: "dbHostname",
          port: 27017,
        },
      ],
      credential: {
        username: ,
        password: "dbPass",
        db: "dbName",
        mechanism: "SCRAM-SHA-1",
      },
    });
    
    export {client};
    `
    
    }
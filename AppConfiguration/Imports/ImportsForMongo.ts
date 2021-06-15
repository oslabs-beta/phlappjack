


export const mongooseString = (mongoHostState ,userNameState ,passWordState ,mongoDBState) => {

    return `import { MongoClient } from '../deps.ts'
    const client = new MongoClient();
    
    await client.connect({
      tls: true,
      db:'',
      servers: [
        {
          host: "${mongoHostState}",
          port: 27017,
        },
      ],
      credential: {
        username: "${userNameState}",
        password: "${passWordState}",
        db: "${mongoDBState}",
        mechanism: "SCRAM-SHA-1",
      },
    });`
    
    }
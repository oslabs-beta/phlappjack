import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts'

const MONGO_URL = `mongodb+srv://deno:denoPassword@cluster0.0q57x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` 
const client = new MongoClient();
client.connectWithUri(MONGO_URL);

const db = client.database('notes');

export default db;
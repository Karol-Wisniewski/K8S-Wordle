import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config/config.js';

console.log(`Łączenie z bazą danych...`);
console.log(`Adres: ${config.mongodb.url}`);

const client = new MongoClient(config.mongodb.url , {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    monitorCommands: true,
});

// await client.connect().catch(err => {
//     console.log(`Error podczas łączenia z bazą danych:`);
//     console.log(err);
//     process.exit(1);
// });

export default {
    client
};
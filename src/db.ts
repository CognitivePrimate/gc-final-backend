import {MongoClient} from 'mongodb';

//const uri = process.env.MONGO_URI || '';
const uri = 'mongodb+srv://admin:shittylist@gcfinalproject-aw-br-dj.zvaga.mongodb.net/OrganizationOne?retryWrites=true&w=majority'

if (!uri) {
    console.error('ERROR: Missing environment variable.');
}

let client : MongoClient = new MongoClient(uri);

export const getClient = async () => {
    await client.connect();
    return client;
}
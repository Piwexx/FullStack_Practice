const { MongoClient } = require('mongodb');

let client = null;

async function connect(uri, dbName) {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(dbName);
}

function close() {
    if (client) {
        return client.close();
    }
}

module.exports = { connect, close };
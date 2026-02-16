const nano = require("nano");
require('dotenv').config();

const couch = nano(process.env.COUCHDB_URL);
const dbName = process.env.DB_NAME;

async function CheckDb(params) {
    let dbList = await couch.db.list();

    if (dbList.includes(dbName)) {
        console.log("Connected to CouchDB");
        return
    }
    await couch.db.create(dbName);
    console.log("Database created:", dbName);
}

const database = couch.use(dbName);

module.exports = { database: database, CheckDb };
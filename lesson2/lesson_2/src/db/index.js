const path = require("node:path");
const lowdb = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");

path.join(__dirname, "..", "..", "data", "db.json");

const adapter = new FileSync(
  path.join(__dirname, "..", "..", "data", "db.json")
);
const db = lowdb(adapter);

db.defaults({ cats: [] }).write();

module.exports = db;

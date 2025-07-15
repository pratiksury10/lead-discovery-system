const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "data.db");
const db = new sqlite3.Database(dbPath);

// Create companies table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    website TEXT,
    funding_stage TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create contacts table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    name TEXT,
    title TEXT,
    email TEXT,
    linkedin_url TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )`);
});

module.exports = db;










// // backend/db/db.js
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");

// const dbPath = path.resolve(__dirname, "data.db");
// const db = new sqlite3.Database(dbPath);

// // Create tables if they don't exist
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS companies (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     website TEXT,
//     funding_stage TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )`);
// });

// module.exports = db;

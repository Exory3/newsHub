import Database from 'better-sqlite3'

const db = new Database('data.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tags TEXT NOT NULL, 
    views INTEGER NOT NULL DEFAULT 0,
    article TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  );
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  createdAt INTEGER NOT NULL
   )`)

export default db

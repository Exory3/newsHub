import Database from 'better-sqlite3'

const db = new Database('data.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]', 
    image TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png?20081021155534',
    views INTEGER NOT NULL DEFAULT 0,
    article TEXT NOT NULL,
    author TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  );
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  createdAt INTEGER NOT NULL
   )`)

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
)`)

db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  newsId INTEGER NOT NULL,
  authorName TEXT NOT NULL,
  content TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  FOREIGN KEY (newsId) REFERENCES news(id)
)`)

export default db

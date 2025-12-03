import Database from 'better-sqlite3'
import bcrypt from 'bcrypt'

const db = new Database('data.db')

const hash = await bcrypt.hash('admin123', 10)

db.prepare(
  `
  INSERT OR IGNORE INTO users (email, password, role)
  VALUES (?, ?, ?)
`
).run('admin@site.com', hash, 'admin')

console.log('Admin user created')

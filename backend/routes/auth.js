import db from '../db.js'
import bcrypt from 'bcrypt'
import {z} from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function authRoutes(app) {
  app.post('/signup', async (request, reply) => {
    const {email, password, confirmPassword} = request.body
    try {
      signUpSchema.parse({
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
      })

      const exists = db
        .prepare('SELECT id FROM users WHERE email = ?')
        .get(email)

      if (exists) {
        return reply.code(409).send({error: {message: 'Email already in use'}})
      }

      const hash = await bcrypt.hash(password, 10)

      const result = db
        .prepare(
          `INSERT INTO users (email, password, role)
         VALUES (?, ?, ?)`
        )
        .run(email, hash, 'user')

      return reply.code(201).send({
        data: {
          id: result.lastInsertRowid,
          email,
          role: 'user',
        },
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.code(400).send({
          error: {
            message: 'Invalid input',
            details: err.issues,
          },
        })
      }

      console.error(err)
      return reply.code(500).send({error: {message: 'Server error'}})
    }
  })

  app.post('/login', async (request, reply) => {
    const {email, password} = request.body

    const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email)

    if (!user) {
      return reply.status(401).send({error: 'Invalid credentials'})
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return reply.status(401).send({error: 'Invalid credentials'})
    }

    // set signed cookie
    reply.setCookie('session', String(user.id), {
      path: '/',
      httpOnly: false,
      signed: false,
      sameSite: 'lax',
      secure: false,
    })
    return {role: user.role, userId: user.id, user: user.email.split('@')[0]}
  })

  app.post('/logout', async (request, reply) => {
    reply.clearCookie('session', {
      path: '/', // must match the cookie path
      signed: true, // must match if you used signed
      sameSite: 'lax', // must match the sameSite
      secure: false, // match secure for localhost
    })
    return {message: 'Logged out'}
  })

  app.get('/me', (req, reply) => {
    const userId = req.cookies.session
    if (!userId) return {user: null, role: 'guest'}

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    if (!user) return {user: null, role: 'guest'}

    return {
      status: 'authed',
      user: {id: user.id, email: user.email},
      role: user.role,
    }
  })
}

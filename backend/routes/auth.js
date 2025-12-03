import db from '../db.js'
import bcrypt from 'bcrypt'

export default function authRoutes(app) {
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
    if (!userId) return {user: null, role: 'guestr'}

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    if (!user) return {user: null, role: 'guestxd'}

    return {
      status: 'authed',
      user: {id: user.id, email: user.email},
      role: user.role,
    }
  })
}

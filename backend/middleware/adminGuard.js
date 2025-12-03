import db from '../db.js'

export async function adminGuard(request, reply) {
  const {session} = request.cookies

  if (!session) return reply.status(401).send({error: 'Not authenticated'})

  const user = db.prepare(`SELECT role FROM users WHERE id = ?`).get(value)

  if (!user || user.role !== 'admin')
    return reply.status(403).send({error: 'Forbidden'})

  request.user = user
}

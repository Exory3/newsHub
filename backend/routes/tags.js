import db from '../db.js'

export default function tagsRoutes(app) {
  app.get('/tags', (_, reply) => {
    const rows = db.prepare(`SELECT tags FROM news`).all()

    const counts = new Map()

    rows.forEach((row) => {
      JSON.parse(row.tags).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    const result = [...counts.entries()]
      .map(([tag, count]) => ({tag, count}))
      .sort((a, b) => b.count - a.count)
    return reply.status(200).send({data: result})
  })
}

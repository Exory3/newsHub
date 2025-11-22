import db from '../db.js'

export default function tagsRoutes(app) {
  app.get('/tags', (_, reply) => {
    const tags = db
      .prepare(
        `SELECT tag, COUNT(*) as count
       FROM news
       GROUP BY tag
       ORDER BY cound DESC`
      )
      .all()

    return reply.status(200).send({data: tags})
  })
}

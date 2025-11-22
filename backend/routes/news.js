import db from '../db.js'
import * as z from 'zod'

const newsSchema = z.object({
  title: z.string().trim().min(5),
  article: z.string().trim().min(10),
  tag: z.string() || null,
})

const getNewsById = (id) =>
  db.prepare('SELECT * FROM news WHERE id = ?').get(id)

export default function newsRoutes(app) {
  app.get('/news', (request, reply) => {
    const page = Number(request.query.page ?? 1)
    const limit = Number(request.query.limit ?? 10)
    const tag = request.query.tag?.trim() || null

    const offset = (page - 1) * limit

    const items = db
      .prepare(
        `SELECT *
     FROM news
     WHERE (? IS NULL OR tag = ?)
     ORDER BY id DESC
     LIMIT ? OFFSET ?`
      )
      .all(tag, tag, limit, offset)

    const total = db
      .prepare(
        `SELECT COUNT(*) AS count
     FROM news
     WHERE (? IS NULL OR tag = ?)`
      )
      .get(tag, tag).count

    if (tag && total === 0) {
      return reply.status(404).send({
        error: {message: 'No articles found for your tag', code: 'NOT_FOUND'},
      })
    }

    return {
      data: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        items,
      },
    }
  })
  app.get('/news/:id', (request, reply) => {
    const {id} = request.params
    const article = getNewsById(id)

    if (!article) {
      return reply
        .status(404)
        .send({error: {message: 'Article not found', code: 'NOT_FOUND'}})
    }
    return reply.status(200).send({data: article})
  })
  app.post('/news', (request, reply) => {
    const {title, article, tag} = request.body
    const createdAt = Date.now()

    try {
      newsSchema.parse({title, article, tag})

      const insert = db.prepare(`
        INSERT INTO news(title,article,createdAt,tag)
        VALUES(?, ?, ?, ?)
      `)

      const result = insert.run(title, article, createdAt, tag)
      reply
        .code(201)
        .header('Location', `/news/${result.lastInsertRowid}`)
        .send({
          data: {id: result.lastInsertRowid, title, article, createdAt, tag},
        })
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.code(400).send({
          error: {message: 'Validation failed', code: 'VALIDATION_ERROR'},
        })
      }
    }
  })

  app.patch('/news/:id', (request, reply) => {
    const {title, article, tag} = request.body
    const {id} = request.params

    try {
      const existing = getNewsById(id)
      if (!existing) {
        return reply.code(404).send({
          error: {message: 'News article not found', code: 'NOT_FOUND'},
        })
      }
      const update = db.prepare(`
      UPDATE news 
      SET title = ?, article = ?
      WHERE id = ?
      `)

      const updateData = {
        title: title ?? existing.title,
        article: article ?? existing.article,
      }
      const updateSchema = newsSchema.partial()
      updateSchema.parse(updateData)

      update.run(title ?? existing.title, article ?? existing.article, id)
      const data = getNewsById(id)
      reply.code(200).send({data})
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.code(400).send({
          error: {message: 'Validation failed', code: 'VALIDATION_ERROR'},
        })
      }
    }
  })
  app.patch('/news/:id/view', (request, reply) => {
    const {id} = request.params
    db.prepare('UPDATE news SET views = views +1 WHERE ID = ?').run(id)
    return reply.status(204).send()
  })
  app.delete('/news/:id', (request, reply) => {
    const {id} = request.params

    const article = db.prepare('SELECT * FROM news WHERE id = ?').get(id)
    if (!article) {
      return reply
        .code(404)
        .send({error: {message: 'Article not found', code: 'NOT_FOUND'}})
    }

    db.prepare('DELETE FROM news WHERE id = ?').run(id)
    reply
      .code(200)
      .send({data: article, message: 'Article successfully deleted'})
  })
}

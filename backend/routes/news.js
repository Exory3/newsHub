import db from '../db.js'
import * as z from 'zod'

const newsSchema = z.object({
  title: z.string().trim().min(5),
  article: z.string().trim().min(10),
  tags: z.array(z.string()),
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
     WHERE (? IS NULL OR tags LIKE '%' || ? || '%')
     ORDER BY id DESC
     LIMIT ? OFFSET ?`
      )
      .all(tag, tag, limit, offset)
      .map((row) => ({...row, tags: JSON.parse(row.tags)}))

    const total = db
      .prepare(
        `SELECT COUNT(*) AS count
     FROM news
     WHERE (? IS NULL OR tags LIKE '%' || ? || '%')`
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
    return reply.status(200).send({data: {...article, tags}})
  })
  app.post('/news', (request, reply) => {
    const {title, article, image, tags} = request.body

    const tagsJson = JSON.stringify(tags)
    const createdAt = Date.now()

    try {
      newsSchema.parse({title, article, tags})

      const insert = db.prepare(`
        INSERT INTO news(title,tags,article,createdAt,image)
        VALUES(?, ?, ?, ?, ?)
      `)

      const result = insert.run(title, tagsJson, article, createdAt, image)
      reply
        .code(201)
        .header('Location', `/news/${result.lastInsertRowid}`)
        .send({
          data: {id: result.lastInsertRowid, title, article, createdAt, tags},
        })
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.code(400).send({
          error: {message: 'Validation failed', code: 'VALIDATION_ERROR'},
        })
      } else {
        console.error(err) // log for debugging
        reply.code(500).send({
          error: {message: 'Server error', code: 'SERVER_ERROR'},
        })
      }
    }
  })

  app.patch('/news/:id', (request, reply) => {
    const {title, article, tags} = request.body
    const {id} = request.params

    try {
      const existing = getNewsById(id)
      if (!existing) {
        return reply.code(404).send({
          error: {message: 'News article not found', code: 'NOT_FOUND'},
        })
      }

      const updateData = {
        title: title ?? existing.title,
        article: article ?? existing.article,
        tags: tags ?? existing.tags,
      }
      const updateSchema = newsSchema.partial()
      updateSchema.parse(updateData)

      const update = db.prepare(`
        UPDATE news 
        SET title = ?, article = ?, tags = ?
        WHERE id = ?
      `)

      update.run(
        updateData.title,
        updateData.article,
        JSON.stringify(updateData.tags),
        id
      )

      const data = getNewsById(id)
      reply.code(200).send({data})
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.code(400).send({
          error: {message: 'Validation failed', code: 'VALIDATION_ERROR'},
        })
      }
      throw err
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

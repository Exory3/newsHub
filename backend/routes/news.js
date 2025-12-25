import db from '../db.js'
import * as z from 'zod'
import {adminGuard} from '../middleware/adminGuard.js'

const newsSchema = z.object({
  title: z.string().trim().min(5),
  article: z.string().trim().min(10),
  tags: z.array(z.string()),
  author: z.string(),
})
const commentSchema = z.object({
  comment: z.string().trim().min(1),
  author: z.string().min(1),
})

const getNewsById = (id) =>
  db.prepare('SELECT * FROM news WHERE id = ?').get(id)

export default function newsRoutes(app) {
  app.get('/news', (request, reply) => {
    const page = Number(request.query.page ?? 1)
    const limit = Number(request.query.limit ?? 10)
    const filter = request.query.filter ?? 'default'
    const tag = request.query.tag?.trim() || null
    const offset = (page - 1) * limit
    const author = request.query.author ?? null

    const now = Date.now()
    const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000 // 3 days in ms
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const tomorrowStart = todayStart.getTime() + 24 * 60 * 60 * 1000

    // --- Build WHERE dynamically ---
    let where = '1 = 1'
    const params = []

    // Popular filter
    if (filter === 'popular') {
      where += ' AND createdAt >= ?'
      params.push(threeDaysAgo)
    }

    // Recent filter (today only)
    if (filter === 'recent') {
      where += ' AND createdAt >= ? AND createdAt < ?'
      params.push(todayStart.getTime(), tomorrowStart)
    }
    if (tag) {
      where += " AND tags LIKE '%' || ? || '%'"
      params.push(tag)
    }

    if (author) {
      where += ` AND author = ?`
      params.push(author)
    }
    // --- Fetch items ---
    const items = db
      .prepare(
        `SELECT *
     FROM news
     WHERE ${where}
     ORDER BY ${filter === 'popular' ? 'views DESC' : 'id DESC'}
     LIMIT ? OFFSET ?`
      )
      .all(...params, limit, offset)
      .map((r) => ({...r, tags: JSON.parse(r.tags)}))

    // --- Count total ---
    const total = db
      .prepare(
        `SELECT COUNT(*) AS count
     FROM news
     WHERE ${where}`
      )
      .get(...params).count

    // Tag-specific 404
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
        author,
      },
    }
  })

  app.get('/news/:id', (request, reply) => {
    const id = Number(request.params.id)
    if (Number.isNaN(id)) {
      return reply.code(400).send({error: 'Invalid ID'})
    }

    const article = getNewsById(id)

    if (!article) {
      return reply
        .status(404)
        .send({error: {message: 'Article not found', code: 'NOT_FOUND'}})
    }
    return reply.status(200).send({data: {...article}})
  })

  app.post('/news', (request, reply) => {
    const {title, article, image, tags, author} = request.body

    const tagsJson = JSON.stringify(tags)
    const createdAt = Date.now()

    try {
      newsSchema.parse({title, article, tags, author})

      const insert = db.prepare(`
        INSERT INTO news(title,tags,article,createdAt,image, author)
        VALUES(?, ?, ?, ?, ?,?)
      `)

      const result = insert.run(
        title,
        tagsJson,
        article,
        createdAt,
        image,
        author
      )
      reply
        .code(201)
        .header('Location', `/news/${result.lastInsertRowid}`)
        .send({
          data: {
            id: result.lastInsertRowid,
            title,
            article,
            createdAt,
            tags,
          },
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
    const {title, article, tags, image} = request.body
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
        image: image ?? existing.image,
      }
      const updateSchema = newsSchema.partial()
      updateSchema.parse(updateData)

      const update = db.prepare(`
        UPDATE news 
        SET title = ?, article = ?, tags = ?, image = ?
        WHERE id = ?
      `)

      update.run(
        updateData.title,
        updateData.article,
        JSON.stringify(updateData.tags),
        updateData.image,
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
    const id = Number(request.params.id)
    console.log('PARAMS:', request.params)
    console.log('ID:', id)

    if (Number.isNaN(id)) {
      return reply.code(400).send({error: 'Invalid ID'})
    }

    const article = db.prepare('SELECT * FROM news WHERE id = ?').get(id)

    if (!article) {
      return reply
        .code(404)
        .send({error: {message: 'Article not found', code: 'NOT_FOUND'}})
    }

    db.prepare('DELETE FROM news WHERE id = ?').run(id)

    return reply
      .code(200)
      .send({data: article, message: 'Article successfully deleted'})
  })

  app.get('/news/:id/comments', (request, reply) => {
    const id = Number(request.params.id)
    if (Number.isNaN(id)) {
      return reply.code(400).send({error: 'Invalid ID'})
    }
    const items = db
      .prepare(
        `
        SELECT * 
        FROM comments 
        WHERE newsId=?
        ORDER BY createdAt DESC
      `
      )
      .all(id)
    reply.code(200).send({items})
  })

  app.post('/news/:id/comments', (request, reply) => {
    const id = Number(request.params.id)
    const {comment, author} = request.body
    try {
      commentSchema.parse({comment, author})
      const createdAt = Date.now()
      const result = db
        .prepare(
          `
      INSERT INTO comments(newsId,authorName,content,createdAt)
      VALUES(?,?,?,?)
      `
        )
        .run(id, author, comment, createdAt)

      reply.code(201).send({
        id: result.lastInsertRowid,
        newsId: id,
        content: comment,
        authorName: author,
        createdAt,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.code(400).send({
          error: {message: 'Invalid data provided', code: 'INVALID_DATA'},
        })
      } else {
        console.error(err) // log for debugging
        reply.code(500).send({
          error: {message: 'Server error', code: 'SERVER_ERROR'},
        })
      }
    }
  })
}

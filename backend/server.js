import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import newsRoutes from './routes/news.js'
import tagsRoutes from './routes/tags.js'
import subscribe from './routes/subscribe.js'

import fastifyCookie from '@fastify/cookie'
import authRoutes from './routes/auth.js'

const app = Fastify()
await app.register(cors, {
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true, // allow cookies to be sent
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
})

app.register(fastifyCookie, {
  secret: 'super-secret-key-change-this', // for signing cookies
  hook: 'onRequest',
})

app.register(newsRoutes)
app.register(tagsRoutes)
app.register(subscribe)
app.register(authRoutes)

const port = Number(process.env.PORT) || 3000
app.listen({port, host: '0.0.0.0'}, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})

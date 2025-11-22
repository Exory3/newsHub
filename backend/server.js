import 'dotenv/config'
import Fastify, { fastify } from 'fastify'
import cors from "@fastify/cors"
import newsRoutes from './routes/news.js'
import tagsRoutes from './routes/tags.js'
import subscribe from "./routes/subscribe.js"

const app = Fastify()
await app.register(cors,{
  origin:true
})
app.register(newsRoutes)
app.register(tagsRoutes)
app.register(subscribe)

const port = Number(process.env.PORT) || 3000
app.listen({port}, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})

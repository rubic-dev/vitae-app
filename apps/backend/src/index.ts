import Fastify from "fastify"
import { db } from "./db/index.js"
import { students } from "./db/schema.js"

const PORT = 3000

const app = Fastify()

app.get("/students", async () => {
  return db.select().from(students)
})
app.get("/health", async () => {
  return {
    ok: true
  }
})

app.listen({
  port: PORT
})
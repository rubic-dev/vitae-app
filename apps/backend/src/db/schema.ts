import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  grade: integer("grade").notNull()
})
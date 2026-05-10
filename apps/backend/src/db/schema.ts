import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

//
// vaults
//

export const vaults = sqliteTable("vaults", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  color: text("color"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

//
// tags
//

export const subjects = sqliteTable("subjects", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  name: text("name").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

export const topics = sqliteTable("topics", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  subjectId: text("subject_id"), // nullable = orphanable

  name: text("name").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

export const subtopics = sqliteTable("subtopics", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  topicId: text("topic_id"), // nullable

  name: text("name").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

//
// questions
//

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  questionText: text("question_text").notNull(),
  correctAnswer: text("correct_answer").notNull(),

  subjectId: text("subject_id"),
  topicId: text("topic_id"),
  subtopicId: text("subtopic_id"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
})

export const questionOptions = sqliteTable("question_options", {
  id: text("id").primaryKey(),
  questionId: text("question_id").notNull(),

  label: text("label").notNull(),
  value: text("value").notNull(),

  position: integer("position").notNull()
})

//
// sessions
//

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  name: text("name").notNull(),

  subjectId: text("subject_id").notNull(),

  questionCount: integer("question_count").notNull(),
  timeLimit: integer("time_limit"),

  maxAttempts: integer("max_attempts").notNull(),
  currentAttempts: integer("current_attempts").notNull().default(1),

  status: text("status").notNull(),

  reviewDate: integer("review_date", { mode: "timestamp" }),
  lastReviewed: integer("last_reviewed", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

export const sessionTopics = sqliteTable("session_topics", {
  sessionId: text("session_id").notNull(),
  topicId: text("topic_id").notNull()
})

export const sessionSubtopics = sqliteTable("session_subtopics", {
  sessionId: text("session_id").notNull(),
  subtopicId: text("subtopic_id").notNull()
})

export const sessionAttempts = sqliteTable("session_attempts", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),

  attemptNumber: integer("attempt_number").notNull(),

  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),

  score: integer("score"),
  correctQuestions: integer("correct_questions"),
  durationSeconds: integer("duration_seconds")
})

export const sessionAttemptQuestions = sqliteTable("session_attempt_questions", {
  id: text("id").primaryKey(),

  sessionAttemptId: text("session_attempt_id").notNull(),
  questionId: text("question_id").notNull(),

  position: integer("position").notNull()
})

export const questionAttempts = sqliteTable("question_attempts", {
  id: text("id").primaryKey(),

  sessionAttemptId: text("session_attempt_id").notNull(),
  questionId: text("question_id").notNull(),

  userAnswer: text("user_answer"),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),

  timeTakenSeconds: integer("time_taken_seconds").notNull(),

  attemptedAt: integer("attempted_at", { mode: "timestamp" }).notNull()
})

export const questionReviews = sqliteTable("question_reviews", {
  id: text("id").primaryKey(),

  questionAttemptId: text("question_attempt_id").notNull(),

  note: text("note").notNull(),

  type: text("type").notNull(), // "flag" | "solution" | "note"

  resolved: integer("resolved", { mode: "boolean" }).default(false),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

//
// notes
//

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  vaultId: text("vault_id").notNull(),

  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),

  subjectId: text("subject_id"),
  topicId: text("topic_id"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
})

export const noteTags = sqliteTable("note_tags", {
  id: text("id").primaryKey(),

  noteId: text("note_id").notNull(),

  label: text("label").notNull(),
  type: text("type").notNull()
})

//
// archives
//

export const archive = sqliteTable("archive", {
  id: text("id").primaryKey(),

  vaultId: text("vault_id").notNull(),

  entityType: text("entity_type").notNull(),
  // "question" | "session" | "subject" | "topic" | "subtopic" | "note"

  entityId: text("entity_id").notNull(),

  deletedAt: integer("deleted_at", { mode: "timestamp" }).notNull(),

  // optional future undo system
  payloadSnapshot: text("payload_snapshot"), 
  // JSON string (optional but VERY useful later)

  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
})
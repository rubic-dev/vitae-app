export type SessionSettings = {
  sessionId?: string

  subject: string
  topics?: string[]
  subtopics?: string[]

  questionCount?: number
  maxAttempts?: number
  timeLimit?: number | null

  new: boolean
}

export type QuestionEntity = {
  id: string
  questionText: string
  options: string[]
  correctAnswer: string

  subject: string
  topic: string
  subtopic: string
}
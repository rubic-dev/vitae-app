import type { SessionEntity, QuestionEntity, QuestionAttemptEntity } from "../../types/backend";
import type { SessionTableRow, QuestionRow, QuestionAttemptRow } from "../../types/table";

export function mapSessionToRow(
  session: SessionEntity,
  attemptsMeta: { currentAttempts: number }
): SessionTableRow {
  return {
    id: session.id,

    sessionName: session.session_name,
    subject: session.subject,

    topics: session.topics ?? [],
    subtopics: session.subtopics ?? [],

    questionCount: session.question_count,
    timeLimit: session.time_limit,

    attempts: {
      current: attemptsMeta.currentAttempts,
      max: session.max_attempts,
    },

    reviewDate: session.review_date,
    lastReviewed: session.last_reviewed,

    status: session.status,
  };
}

export function mapQuestionToRow(q: QuestionEntity): QuestionRow {
  return {
    id: q.id,
    questionText: q.question_text,
    correctAnswer: q.correct_answer,
    options: q.options,

    subject: q.subject,
    topics: q.topics,
    subtopics: q.subtopics,

    createdAt: q.created_at,
  };
}

export function mapAttemptToRow(a: QuestionAttemptEntity): QuestionAttemptRow {
  return {
    id: a.id,

    questionText: a.question_text,
    correctAnswer: a.correct_answer,
    userAnswer: a.user_answer,

    options: a.options,

    isCorrect: a.is_correct,
    timeTaken: a.time_taken,

    subject: a.subject,
    topics: a.topics,
    subtopics: a.subtopics,

    attemptedAt: a.attempted_at,
  };
}
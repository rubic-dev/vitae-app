import { generateMockQuestionAttempts } from "../../data/generateQuestionAttempts";
import type { QuestionAttemptRow } from "../../types/attempts";
import type { QuestionAttemptEntity } from "../../types/backend";

export type SessionAttempt = {
  id: string;
  index: number;
  questions: QuestionAttemptRow[];
};

export function normalizeAttempt(a: QuestionAttemptEntity): QuestionAttemptRow {
  return {
    id: a.id,

    questionText: a.question_text,
    options: a.options,
    correctAnswer: a.correct_answer,

    userAnswer: a.user_answer,
    isCorrect: a.is_correct,

    timeTaken: a.time_taken,

    subject: a.subject,
    topics: a.topics,
    subtopics: a.subtopics,

    attemptedAt: a.attempted_at,
  };
}

export async function generateSessionAttempts(sessionId: string): Promise<SessionAttempt[]> {
  const base = generateMockQuestionAttempts(15);

  const mapped = base.map(normalizeAttempt);

  return [
    {
      id: `${sessionId}-a1`,
      index: 1,
      questions: mapped.slice(0, 5),
    },
    {
      id: `${sessionId}-a2`,
      index: 2,
      questions: mapped.slice(5, 10),
    },
  ];
}
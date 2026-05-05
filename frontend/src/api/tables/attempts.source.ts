import { USE_API } from "../../config/tableSource";
import { generateMockQuestionAttempts } from "../../data/generateQuestionAttempts";

export type QuestionAttemptEntityInput = {
  id: string;

  attempt_id: string;
  question_id: string;

  question_text: string;
  options: string[];
  correct_answer: string;

  user_answer: string;
  is_correct: boolean;

  time_taken: number;

  subject: string;
  topics: string[];
  subtopics: string[];

  attempted_at: string;
};

export type QuestionAttemptRow = {
  id: string;

  questionText: string;
  options: string[];
  correctAnswer: string;

  userAnswer: string;
  isCorrect: boolean;

  timeTaken: number;

  subject: string;
  topics: string[];
  subtopics: string[];

  attemptedAt: string;
};

export function normalizeAttempt(a: QuestionAttemptEntityInput): QuestionAttemptRow {
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


export async function getAttemptRows(): Promise<QuestionAttemptRow[]> {
  if (USE_API) {
    const res = await fetch("/api/sessions");
    const data = await res.json();
    return data.map((s: QuestionAttemptEntityInput) => normalizeAttempt(s));
  }

  // mock path STILL async
  return generateMockQuestionAttempts(50).map(normalizeAttempt)
}

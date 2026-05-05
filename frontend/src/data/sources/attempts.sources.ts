import type { QuestionAttemptRow } from "../../types/attempts";
import { generateMockQuestionAttempts } from "../generateQuestionAttempts";

export function getAttemptRows(): QuestionAttemptRow[] {
  return generateMockQuestionAttempts(50).map((a) => ({
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
  }));
}

import type { QuestionAttemptEntity } from "../types/backend";
import { generateMockQuestions } from "./generateQuestions";

function formatSeconds(max = 300) {
  return Math.floor(Math.random() * max);
}

export function generateMockQuestionAttempts(count: number): QuestionAttemptEntity[] {
  const questions = generateMockQuestions(count);

  return questions.map((q, i) => {
    const userAnswer = q.options[Math.floor(Math.random() * q.options.length)];

    return {
      id: `qa${i + 1}`,

      attempt_id: `a${Math.floor(i / 10) + 1}`,
      question_id: q.id,

      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,

      user_answer: userAnswer,
      is_correct: userAnswer === q.correct_answer,

      time_taken: formatSeconds(600),

      subject: q.subject,
      topics: q.topics,
      subtopics: q.subtopics,

      attempted_at: new Date(2026, 4, i + 1).toISOString(),
    };
  });
}
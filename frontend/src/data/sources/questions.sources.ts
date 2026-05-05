import type { QuestionRow } from "../../types/questions";
import { generateMockQuestions } from "../generateQuestions";

export function getQuestionRows(): QuestionRow[] {
  return generateMockQuestions(50).map((q) => ({
    id: q.id,

    questionText: q.question_text,
    options: q.options,
    correctAnswer: q.correct_answer,

    subject: q.subject,
    topics: q.topics,
    subtopics: q.subtopics,

    createdAt: q.created_at,
  }));
}

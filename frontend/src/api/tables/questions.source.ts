import { generateMockQuestions } from "../../data/generateQuestions";

export type QuestionEntityInput = {
  id: string;

  question_text: string;
  options: string[];
  correct_answer: string;

  subject: string;
  topics: string[];
  subtopics: string[];

  created_at: string;
};

export type QuestionRow = {
  id: string;

  questionText: string;
  options: string[];
  correctAnswer: string;

  subject: string;
  topics: string[];
  subtopics: string[];

  createdAt: string;
};

export function normalizeQuestion(q: QuestionEntityInput): QuestionRow {
  return {
    id: q.id,

    questionText: q.question_text,
    options: q.options,
    correctAnswer: q.correct_answer,

    subject: q.subject,
    topics: q.topics,
    subtopics: q.subtopics,

    createdAt: q.created_at,
  };
}

export function getQuestionRows() {
  return generateMockQuestions(50).map(normalizeQuestion);
}

export async function fetchQuestionRows(): Promise<QuestionRow[]> {
  const res = await fetch("/api/questions");
  const data: QuestionEntityInput[] = await res.json();

  return data.map(normalizeQuestion);
}
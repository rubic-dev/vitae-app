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
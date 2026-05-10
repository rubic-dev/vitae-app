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
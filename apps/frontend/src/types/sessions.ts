export type SessionRow = {
  id: string;

  sessionName: string;
  subject: string;

  topics: string[];
  subtopics: string[];

  questionCount: number;
  timeLimit: number;

  attempts: {
    current: number;
    max: number;
  };

  status: string;

  createdAt: string;
  reviewDate: string;
  lastReviewed: string;
};
export type SessionEntity = {
  id: string;

  session_name: string;
  subject: string;

  topics: string[];
  subtopics: string[];

  question_count: number;
  time_limit: number;
  max_attempts: number;

  status: string;

  created_at: string;
  review_date: string;
  last_reviewed: string;
};

export type QuestionEntity = {
  id: string;

  question_text: string;
  options: string[]; // jsonb → string[] in frontend
  correct_answer: string;

  subject: string;
  topics: string[];
  subtopics: string[];

  created_at: string;
};

export type QuestionAttemptEntity = {
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
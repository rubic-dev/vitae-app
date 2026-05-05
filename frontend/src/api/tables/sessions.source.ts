import { mockSessions } from "../../data/generateSessions";
import { USE_API } from "../../config/tableSource";

export type SessionEntityInput = {
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

export function normalizeSession(
  s: SessionEntityInput,
  currentAttempts: number
): SessionRow {
  return {
    id: s.id,

    sessionName: s.session_name,
    subject: s.subject,

    topics: s.topics,
    subtopics: s.subtopics,

    questionCount: s.question_count,
    timeLimit: s.time_limit,

    attempts: {
      current: currentAttempts,
      max: s.max_attempts,
    },

    status: s.status,

    createdAt: s.created_at,
    reviewDate: s.review_date,
    lastReviewed: s.last_reviewed,
  };
}

export async function getSessionRows(): Promise<SessionRow[]> {
  if (USE_API) {
    const res = await fetch("/api/sessions");
    const data = await res.json();
    return data.map((s: SessionEntityInput) => normalizeSession(s, 0));
  }

  return mockSessions.map((s) =>
    normalizeSession(s, Math.floor(Math.random() * s.max_attempts))
  );
}
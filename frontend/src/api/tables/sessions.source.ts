import { mapSessionToRow } from "../../components/tables/RowMapper";
import { mockSessions } from "../../data/mockSessions";
import type { SessionTableRow } from "../../types/table";

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

let cache: SessionTableRow[] | null = null;

export function getSessionRows(): SessionTableRow[] {
  if (cache) return cache;

  cache = mockSessions.map((s) =>
    mapSessionToRow(s, {
      currentAttempts: Math.floor(Math.random() * s.max_attempts),
    })
  );

  return cache;
}

export async function fetchSessionRows(): Promise<SessionRow[]> {
  // later replace with real API
  const res = await fetch("/api/sessions");
  const data: SessionEntityInput[] = await res.json();

  return data.map((s) => normalizeSession(s, 0));
}
import type { SessionRow } from "../../types/sessions";
import { mockSessions } from "../mockSessions";

export function getSessionRows(): SessionRow[] {
  return mockSessions.map((s) => ({
    id: s.id,

    sessionName: s.session_name,
    subject: s.subject,

    topics: s.topics,
    subtopics: s.subtopics,

    questionCount: s.question_count,
    timeLimit: s.time_limit,

    attempts: {
      current: Math.floor(Math.random() * s.max_attempts),
      max: s.max_attempts,
    },

    status: s.status,

    createdAt: s.created_at,
    reviewDate: s.review_date,
    lastReviewed: s.last_reviewed,
  }));
}

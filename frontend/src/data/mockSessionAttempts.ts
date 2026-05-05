import { generateMockQuestionAttempts } from "./generateQuestionAttempts";
import { mapAttemptToRow } from "../components/tables/RowMapper";
import type { QuestionAttemptRow } from "../types/table";

export type SessionAttempt = {
  id: string;
  index: number;
  questions: QuestionAttemptRow[];
};

export function generateSessionAttempts(sessionId: string): SessionAttempt[] {
  const base = generateMockQuestionAttempts(15);

  const mapped = base.map(mapAttemptToRow);

  return [
    {
      id: `${sessionId}-a1`,
      index: 1,
      questions: mapped.slice(0, 5),
    },
    {
      id: `${sessionId}-a2`,
      index: 2,
      questions: mapped.slice(5, 10),
    },
  ];
}
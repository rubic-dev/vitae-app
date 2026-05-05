import type { SessionEntity } from "../types/backend";

type Subject = "Biology" | "Chemistry" | "Physics";

const subjects: Subject[] = ["Biology", "Chemistry", "Physics"];

const topicPool: Record<Subject, string[]> = {
  Biology: ["Cells", "Genetics", "Evolution", "Ecology", "Enzymes"],
  Chemistry: ["Atoms", "Reactions", "Acids", "Organic", "Periodic Table"],
  Physics: ["Forces", "Energy", "Waves", "Electricity", "Motion"],
};

const subtopicPool: string[] = [
  "Basics",
  "Advanced theory",
  "Problem solving",
  "Applications",
  "Core principles",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], min = 2, max = 4): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.floor(Math.random() * (max - min + 1)) + min);
}

export function generateMockSessions(count = 50): SessionEntity[] {
  return Array.from({ length: count }).map((_, i) => {
    const subject = pick(subjects);
    const topics = pickMany(topicPool[subject], 2, 3);

    return {
      id: `s${i + 1}`,

      session_name: `${subject} Session ${i + 1}`,
      subject,

      topics,
      subtopics: pickMany(subtopicPool, 2, 3),

      question_count: Math.floor(Math.random() * 40) + 10,
      time_limit: [20, 30, 40, 45, 60][Math.floor(Math.random() * 5)],
      max_attempts: Math.floor(Math.random() * 4) + 1,

      status: Math.random() > 0.7 ? "completed" : "active",

      created_at: new Date(2026, 0, i + 1).toISOString(),
      review_date: new Date(2026, 4, i + 1).toISOString(),
      last_reviewed: new Date(2026, 3, i + 1).toISOString(),
    };
  });
}

export const mockSessions: SessionEntity[] = generateMockSessions(116);
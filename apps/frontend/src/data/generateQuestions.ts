import type { QuestionEntity } from "../types/backend";

type Subject = "Biology" | "Chemistry" | "Physics";

const subjects: Subject[] = ["Biology", "Chemistry", "Physics"];

const topicPool: Record<Subject, string[]> = {
  Biology: ["Cells", "Genetics", "Evolution"],
  Chemistry: ["Reactions", "Atoms", "Acids"],
  Physics: ["Forces", "Energy", "Waves"],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

export function generateMockQuestions(count = 50): QuestionEntity[] {
  return Array.from({ length: count }).map((_, i) => {
    const subject = pick(subjects);

    const [t1, t2] = pickMany(topicPool[subject], 2);

    const options = ["Option A", "Option B", "Option C", "Option D"];
    const correct = pick(options);

    return {
      id: `q${i + 1}`,

      question_text: `This is a sample question ${i + 1} about ${t1}.`,
      options,
      correct_answer: correct,

      subject,
      topics: [t1, t2],
      subtopics: [`${t1} basics`, `${t2} advanced`],

      created_at: new Date(2026, 0, i + 1).toISOString(),
    };
  });
}
import type { Note } from "../types/notes";

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Cell Biology Basics",
    fileUrl: "/pdfs/cell-biology.pdf",
    createdAt: "2026-05-01",
    subject: "Biology",
    topic: "Cells",
    tags: [
      { id: "t1", label: "Biology", type: "subject" },
      { id: "t2", label: "Cells", type: "topic" }
    ]
  },
  {
    id: "2",
    title: "Newtonian Mechanics",
    fileUrl: "/pdfs/mechanics.pdf",
    createdAt: "2026-04-22",
    subject: "Physics",
    topic: "Forces",
    tags: [
      { id: "t3", label: "Physics", type: "subject" },
      { id: "t4", label: "Forces", type: "topic" }
    ]
  },
  {
    id: "3",
    title: "Organic Chemistry Reactions",
    fileUrl: "/pdfs/organic-chem.pdf",
    createdAt: "2026-03-18",
    subject: "Chemistry",
    topic: "Reactions",
    tags: [
      { id: "t5", label: "Chemistry", type: "subject" },
      { id: "t6", label: "Reactions", type: "topic" }
    ]
  }
];
export type NoteTag = {
  id: string;
  label: string;
  type: "subject" | "topic";
};

export type Note = {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: string;

  tags: NoteTag[];

  subject: string; // required
  topic?: string;   // optional
};
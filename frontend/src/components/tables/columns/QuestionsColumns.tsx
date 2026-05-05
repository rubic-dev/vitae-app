import type { TableColumn } from "../../../types/table";
import type { QuestionRow } from "../../../types/questions"
import { Badge } from "../../ui/badge";
import { TableTooltip } from "../components/TableTooltip";

export const questionColumns: TableColumn<QuestionRow>[] = [

  {
    id: "question",
    header: "Question",
    width: 300,
    cell: (row) => (
      <TableTooltip
        hoverClassName="max-w-[300px] truncate"
        content={
          <div className="p-2">
            <h1 className="text-xs font-medium">
              {row.questionText}
            </h1>
          </div>
        }
      >
        <div className="truncate max-w-[300px] hover:underline cursor-pointer">
          {row.questionText}
        </div>
      </TableTooltip>
    ),
    sortAccessor: (row) => row.questionText,
  },

  {
    id: "subject",
    header: "Subject",
    width: 120,
    cell: (row) => row.subject,
    sortAccessor: (row) => row.subject,
  },


  {
    id: "topics",
    header: "Topics",
    cell: (row) => (
      <TableTooltip
        hoverClassName="max-w-[200px] truncate"
        content={
          <div className="space-y-2 p-2">
            <div>
              <div className="text-xs font-semibold">Topics</div>
              <div className="flex gap-2">
                {row.topics.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold">Subtopics</div>
              <div className="flex gap-2">
                {row.subtopics.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <div className="flex gap-2">
          {row.topics.map((t) => (
            <Badge key={t} className="bg-primary/75">{t}</Badge>
          ))}
        </div>
      </TableTooltip>
    ),
  },

  {
    id: "correct",
    header: "Answer",
    width: 150,
    cell: (row) => (
      <TableTooltip
        content={
          <div className="space-y-1">
            {row.options.map((opt) => (
              <div
                key={opt}
                className={opt === row.correctAnswer
                  ? "text-primary bg-primary/50 px-2 py-1 rounded-sm font-medium"
                  : "px-2 py-1"
                }
              >
                {opt}
              </div>
            ))}
          </div>
        }
      >
        {row.correctAnswer}
      </TableTooltip>
    ),
  },

  {
    id: "created",
    header: "Created",
    width: 140,
    cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    sortAccessor: (row) => row.createdAt,
  },
];
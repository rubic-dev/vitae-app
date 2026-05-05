import { Badge } from "../../ui/badge";
import type { TableColumn } from "../../../types/table";
import type { SessionRow } from "../../../types/sessions"
import { TableTooltip } from "../components/TableTooltip";

export const sessionColumns: TableColumn<SessionRow>[] = [
  {
    id: "sessionName",
    header: "Session",
    width: 200,
    cell: (row) => row.sessionName,
    sortAccessor: (row) => row.sessionName,
  },

  {
    id: "subject",
    header: "Subject",
    cell: (row) => row.subject,
    sortAccessor: (row) => row.subject,
  },

  {
    id: "topics",
    header: "Topics",
    width: 200,
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
    id: "questionCount",
    header: "Questions",
    cell: (row) => row.questionCount,
    sortAccessor: (row) => row.questionCount,
  },

  {
    id: "timeLimit",
    header: "Time",
    cell: (row) => `${row.timeLimit} min`,
    sortAccessor: (row) => row.timeLimit,
  },

  {
    id: "attempts",
    header: "Attempts",
    cell: (row) => `${row.attempts.current} / ${row.attempts.max}`,
    sortAccessor: (row) => row.attempts.current,
  },

  {
    id: "reviewDate",
    header: "Next Review",
    cell: (row) => {
      const d = new Date(row.reviewDate);
      const overdue = d.getTime() < Date.now();

      return (
        <span className={overdue ? "text-chart-3 font-medium" : ""}>
          {d.toLocaleDateString()}
        </span>
      );
    },
    sortAccessor: (row) => new Date(row.reviewDate).getTime(),
  },

  {
    id: "lastReviewed",
    header: "Last Reviewed",
    cell: (row) => new Date(row.lastReviewed).toLocaleDateString(),
    sortAccessor: (row) => new Date(row.lastReviewed).getTime(),
  },
];
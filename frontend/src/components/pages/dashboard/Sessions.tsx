import { useMemo, useState } from "react";

import { DataTable } from "../../custom/DataTable";
import { TablePagination } from "../../tables/components/TablePagination";

import { sessionColumns } from "../../tables/columns/SessionColumns";

import { SessionAttemptsDialog } from "../../custom/SessionAttemptsDialog";
import { generateSessionAttempts } from "../../../data/mockSessionAttempts";

import type { SessionRow } from "../../../types/sessions";
import { Button } from "../../ui/button";
import { CirclePlus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useTableSource } from "../../../hooks/useTableSource";

export default function SessionsTable() {
  const table = useTableSource("sessions")

  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<SessionRow | null>(null);

  const attempts = useMemo(() => {
    if (!selectedSession) return [];
    return generateSessionAttempts(selectedSession.id);
  }, [selectedSession]);

  return (
    <div className="space-y-4 min-w-0 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">
          Sessions
        </h1>
        <div className="flex gap-2 items-center">
          {table.selectedIds.size > 0 && (
            <div className="flex items-center gap-2 p-1 border rounded-xl">
              
              <span className="text-xs text-muted-foreground pl-1">
                {table.selectedIds.size} selected
              </span>

              <Button
                onClick={table.deleteSelected}
                className="rounded-lg my-auto"
                variant="destructive"
                size="xs"
              >
                <Trash />
                Delete selected
              </Button>

            </div>
          )}
          <Link to="/dashboard/sessions/create">
            <Button className="rounded-xl">
              <CirclePlus />
              Create Session
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        data={table.data}
        columns={sessionColumns.map((col) => {
          if (col.id !== "attempts") return col;

          return {
            ...col,
            cell: (row: SessionRow) => (
              <button
                className={`hover:underline cursor-pointer transition-all duration-300 ${row.attempts.current !== 0  && "text-chart-3"}`}
                onClick={() => {
                  setSelectedSession(row);
                  setOpen(true);
                }}
              >
                {row.attempts.current} / {row.attempts.max}
              </button>
            ),
          };
        })}
        hasSelection
        selection={table}
        onSort={table.toggleSort}
        sortState={table.sort}
      />

      <TablePagination table={table} />

      <SessionAttemptsDialog
        open={open}
        onOpenChange={setOpen}
        sessionName={selectedSession?.sessionName}
        attempts={attempts}
      />
    </div>
  );
}
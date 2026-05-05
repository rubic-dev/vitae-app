import { useMemo } from "react";
import type { TableColumn } from "../../types/table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  hasSelection?: boolean;

  onSort?: (key: string) => void;
  sortState?: {
    key: string;
    direction: "asc" | "desc";
  } | null;

  selection?: {
    selectedIds: Set<string>;
    toggleRow: (id: string) => void;
    toggleAll: () => void;

    allVisibleSelected?: boolean;
    someVisibleSelected?: boolean;
  };
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  hasSelection,
  selection,
  onSort,
  sortState,
}: DataTableProps<T>) {

  const finalColumns = useMemo(() => {
    if (!hasSelection || !selection) return columns;

    const selectColumn: TableColumn<T> = {
      id: "__select",
      header: (
        <Checkbox
          checked={selection.allVisibleSelected}
          indeterminate={selection.someVisibleSelected}
          onClick={selection.toggleAll}
          className="transition-transform duration-150 active:scale-90"
        />
      ),
      cell: (row: T) => (
        <Checkbox
          checked={selection.selectedIds.has(row.id)}
          onClick={() => selection.toggleRow(row.id)}
          className="transition-transform duration-150 active:scale-90"
        />
      ),
      width: 40,
    };

    return [selectColumn, ...columns];
  }, [hasSelection, selection, columns]);

  return (
    <div className="w-full min-w-0 rounded-xl border bg-background overflow-hidden">
      <div className="w-full max-w-full overflow-x-auto">
        <Table className="min-w-max">

          {/* HEADER */}
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              {finalColumns.map((col) => {
                const isSorted = sortState?.key === col.id;

                return (
                  <TableHead
                    key={col.id}
                    style={{ minWidth: col.width }}
                    className={`
                      px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide
                      border-t transition-all duration-150 ease-out
                      ${col.sortAccessor ? "cursor-pointer hover:text-foreground select-none" : ""}
                    `}
                    onClick={() => {
                      if (col.sortAccessor) {
                        onSort?.(col.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}

                      {col.sortAccessor && (
                        <span
                          className={`
                            transition-all duration-150
                            ${isSorted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
                          `}
                        >
                          {sortState?.direction === "asc"
                            ? <ArrowUpWideNarrow size={14} />
                            : <ArrowDownWideNarrow size={14} />
                          }
                        </span>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {data.map((row, index) => {
              const isSelected = selection?.selectedIds?.has(row.id);

              return (
                <TableRow
                  key={row.id}
                  className={`
                    border-t transition-all duration-200 ease-out relative
                    hover:bg-muted/40
                    ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                    ${isSelected ? "bg-primary/10" : "bg-transparent"}
                  `}
                >
                  {finalColumns.map((col, colIndex) => (
                    <TableCell
                      key={col.id}
                      style={{ minWidth: col.width }}
                      className="px-4 py-3 text-sm relative"
                    >
                      {/* animated accent bar */}
                      {colIndex === 0 && (
                        <div
                          className={`
                            absolute left-0 top-0 h-[90%] w-1 bg-primary rounded-xl pointer-events-none my-[5%]
                            transition-all duration-200 ease-out
                            ${isSelected ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"}
                          `}
                        />
                      )}

                      {col.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

type Props = {
  table: {
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    pageCount: number;
    setPageIndex: (i: number) => void;
    nextPage: () => void;
    previousPage: () => void;
  };
};

export function TablePagination({ table }: Props) {
  const pageIndex = table.pagination.pageIndex;
  const pageCount = table.pageCount;

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pageCount - 1;

  return (
    <div className="flex items-center justify-between w-full mt-4">

      <div className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {pageCount}
      </div>

      <div className="flex items-center gap-2">

        <Button
            disabled={isFirstPage}
            className="rounded-xl"
            onClick={() => table.setPageIndex(0)}
            variant={isLastPage ? "ghost" : "outline"}
            size="icon"
        >
            <ChevronsLeft />
        </Button>

        <Button
            disabled={isFirstPage}
            className="rounded-xl"
            onClick={table.previousPage}
            variant={isLastPage ? "ghost" : "outline"}
            size="icon"
        >
            <ChevronLeft />
        </Button>

        <Input
          className="text-center border rounded-xl w-10"
          value={pageIndex + 1}
          onChange={(e) => {
            table.setPageIndex(Number(e.target.value) - 1);
          }}
        />

        <Button
            disabled={isLastPage}
            className="rounded-xl"
            onClick={table.nextPage}
            variant={isLastPage ? "ghost" : "outline"}
            size="icon"
        >
            <ChevronRight />
        </Button>

        <Button
            disabled={isLastPage}
            className="rounded-xl"
            onClick={() => table.setPageIndex(pageCount - 1)}
            variant={isLastPage ? "ghost" : "outline"}
            size="icon"
        >
            <ChevronsRight />
        </Button>

      </div>

    </div>
  );
}
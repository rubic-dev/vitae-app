import { useMemo, useState } from "react";
import type { SortState, PaginationState, TableColumn } from "../../../types/table";

type UseTableStateProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  initialPageSize?: number;
};

export function useTableState<T extends { id: string }>({
  data,
  columns,
  initialPageSize = 10,
}: UseTableStateProps<T>) {
  const [sort, setSort] = useState<SortState>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 🔽 SORTING
  const sortedData = useMemo(() => {
    if (!sort) return data;

    const column = columns.find((c) => c.id === sort.key);
    if (!column?.sortAccessor) return data;

    return [...data].sort((a, b) => {
      const aVal = column.sortAccessor!(a);
      const bVal = column.sortAccessor!(b);

      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort, columns]);

  // 🔽 PAGE COUNT
  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(sortedData.length / pagination.pageSize));
  }, [sortedData.length, pagination.pageSize]);

  // 🔽 SAFE PAGE INDEX (no effects, no warnings)
  const safePageIndex = Math.min(
    pagination.pageIndex,
    Math.max(0, pageCount - 1)
  );

  // 🔽 PAGINATED DATA (the thing your table actually uses)
  const paginatedData = useMemo(() => {
    const start = safePageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;

    return sortedData.slice(start, end);
  }, [sortedData, safePageIndex, pagination.pageSize]);

  // 🔽 NAVIGATION
  const setPageIndex = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, pageCount - 1));

    setPagination((prev) => ({
      ...prev,
      pageIndex: safeIndex,
    }));
  };

  const nextPage = () => setPageIndex(safePageIndex + 1);
  const previousPage = () => setPageIndex(safePageIndex - 1);

  // 🔽 SORT TOGGLE
  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });

    // reset page on sort (prevents empty pages)
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  //
  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const toggleAll = () => {
    const allIds = paginatedData.map((row) => row.id);

    setSelectedIds((prev) => {
      const next = new Set(prev);

      const allSelected = allIds.every((id) => next.has(id));

      if (allSelected) {
        allIds.forEach((id) => next.delete(id));
      } else {
        allIds.forEach((id) => next.add(id));
      }

      return next;
    });
  };

  const isSelected = (id: string) => selectedIds.has(id);

  const clearSelection = () => setSelectedIds(new Set());

  const deleteSelected = async () => {
    const ids = Array.from(selectedIds);

    console.log("DELETE REQUEST:");
    console.log("IDs:", ids);

    // fake API call
    await new Promise((r) => setTimeout(r, 300));

    console.log("deleted successfully (pretend)");
    clearSelection();
  };

  return {
    data: paginatedData,

    sort,
    setSort,
    toggleSort,

    pagination,
    setPagination,

    pageCount,
    setPageIndex,
    nextPage,
    previousPage,

    selectedIds,
    toggleRow,
    toggleAll,
    isSelected,
    clearSelection,

    deleteSelected
  };
}
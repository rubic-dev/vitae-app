export type SortState =
  | { key: string; direction: "asc" | "desc" }
  | null;

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

type Invariant<T> = (x: T) => T;

type Sortable = string | number | boolean | Date;

export type TableColumn<T> = {
  id: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;

  width?: number;

  // 🔥 this enforces strict typing
  __type?: Invariant<T>;

  sortAccessor?: (row: T) => Sortable;
};

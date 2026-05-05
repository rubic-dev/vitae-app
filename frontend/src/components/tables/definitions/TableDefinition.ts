export type TableDefinition<T> = {
  getData: () => Promise<T[]>;
  columns: import("../../../types/table").TableColumn<T>[];
};
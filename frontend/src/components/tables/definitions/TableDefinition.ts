export type TableDefinition<T> = {
  getData: () => T[];
  columns: import("../../../types/table").TableColumn<T>[];
};
import { useMemo } from "react";
import { tableRegistry, type TableKey, type TableMap } from "../api/tables/table.registry";
import { useTableState } from "../components/tables/hooks/useTableState";

export function useTableSource<K extends TableKey>(key: K) {
  const source = tableRegistry[key];

  const data = useMemo(() => {
    return source.getData();
  }, [source]);

  const table = useTableState<TableMap[K]>({
    data,
    columns: source.columns,
  });

  return {
    ...table,
    columns: source.columns,
  };
}
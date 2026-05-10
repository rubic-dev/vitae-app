import { useEffect, useState } from "react";
import { tableRegistry, type TableKey, type TableMap } from "../api/tables/table.registry";
import { useTableState } from "../components/tables/hooks/useTableState";

export function useTableSource<K extends TableKey>(key: K) {
  const source = tableRegistry[key];

  const [data, setData] = useState<TableMap[K][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const res = await source.getData();
        if (active) setData(res);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [source]);

  const table = useTableState<TableMap[K]>({
    data,
    columns: source.columns,
  });

  return {
    ...table,
    columns: source.columns,
    loading,
  };
}
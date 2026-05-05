import { useState } from "react";

export function useDataSource() {
  const [useApi, setUseApi] = useState(true);

  return {
    useApi,
    toggle: () => setUseApi((prev) => !prev),
  };
}
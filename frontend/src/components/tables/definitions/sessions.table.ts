import type { TableDefinition } from "./TableDefinition";
import type { SessionRow } from "../../../types/sessions";

import { getSessionRows } from "../../../data/sources/sessions.sources";
import { sessionColumns } from "../columns/SessionColumns";

export const sessionsTable: TableDefinition<SessionRow> = {
  getData: getSessionRows,
  columns: sessionColumns,
};

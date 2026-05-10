import type { TableDefinition } from "./TableDefinition";
import type { SessionRow } from "../../../types/sessions";

import { getSessionRows } from "../../../api/tables/sessions.source";
import { sessionColumns } from "../columns/SessionColumns";

export const sessionsTable: TableDefinition<SessionRow> = {
  getData: getSessionRows,
  columns: sessionColumns,
};

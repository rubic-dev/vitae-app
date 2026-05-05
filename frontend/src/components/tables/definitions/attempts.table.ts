import type { TableDefinition } from "./TableDefinition";
import type { QuestionAttemptRow } from "../../../types/attempts";

import { getAttemptRows } from "../../../api/tables/attempts.source";
import { questionAttemptColumns } from "../columns/QuestionAttemptsColumns";

export const attemptsTable: TableDefinition<QuestionAttemptRow> = {
  getData: getAttemptRows,
  columns: questionAttemptColumns,
};
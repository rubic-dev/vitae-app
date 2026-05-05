import type { TableDefinition } from "./TableDefinition";
import type { QuestionRow } from "../../../types/questions";

import { getQuestionRows } from "../../../data/sources/questions.sources";
import { questionColumns } from "../columns/QuestionsColumns";
import { sessionColumns } from "../columns/SessionColumns";

export const questionsTable: TableDefinition<QuestionRow> = {
  getData: getQuestionRows,
  columns: questionColumns,
};

questionsTable.columns = sessionColumns;
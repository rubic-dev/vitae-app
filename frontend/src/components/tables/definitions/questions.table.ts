import type { TableDefinition } from "./TableDefinition";
import type { QuestionRow } from "../../../types/questions";

import { getQuestionRows } from "../../../api/tables/questions.source";
import { questionColumns } from "../columns/QuestionsColumns";

export const questionsTable: TableDefinition<QuestionRow> = {
  getData: getQuestionRows,
  columns: questionColumns,
};
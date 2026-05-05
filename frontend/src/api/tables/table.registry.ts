import { getSessionRows } from "./sessions.source";
import { getQuestionRows } from "./questions.source";
import { getAttemptRows } from "./attempts.source";

import type { TableColumn } from "../../types/table";
import type { SessionRow } from "../../types/sessions";
import type { QuestionRow } from "../../types/questions";
import type { QuestionAttemptRow } from "../../types/attempts";

import { sessionColumns } from "../../components/tables/columns/SessionColumns";
import { questionColumns } from "../../components/tables/columns/QuestionsColumns";
import { questionAttemptColumns } from "../../components/tables/columns/QuestionAttemptsColumns";

export type TableKey =
  | "sessions"
  | "questions"
  | "attempts";

export const tableRegistry: {
  [K in TableKey]: {
    getData: () => TableMap[K][];
    columns: TableColumn<TableMap[K]>[];
  };
} = {
  sessions: {
    getData: getSessionRows,
    columns: sessionColumns,
  },

  questions: {
    getData: getQuestionRows,
    columns: questionColumns,
  },

  attempts: {
    getData: getAttemptRows,
    columns: questionAttemptColumns,
  },
};

export type TableMap = {
  sessions: SessionRow;
  questions: QuestionRow;
  attempts: QuestionAttemptRow;
};
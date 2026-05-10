import { useTableSource } from "../../../hooks/useTableSource";

import { DataTable } from "../../custom/DataTable";
import { TablePagination } from "../../tables/components/TablePagination";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { Trash, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Questions() {
  const questionsTable = useTableSource("questions");
  const attemptsTable = useTableSource("attempts");

  return (
    <Tabs defaultValue="all" className="w-full space-y-1 min-w-0">
      
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">
          Questions
        </h1>

        <div className="flex gap-2 items-center">
          {questionsTable.selectedIds.size > 0 && (

            <div className="flex items-center gap-2 p-1 border rounded-xl">
              
              <span className="text-xs text-muted-foreground pl-1">
                {questionsTable.selectedIds.size} selected
              </span>

              <Button
                onClick={questionsTable.deleteSelected}
                className="rounded-lg my-auto"
                variant="destructive"
                size="xs"
              >
                <Trash />
                Delete selected
              </Button>

            </div>
          )}
          <TabsList className="rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">
              Questions
            </TabsTrigger>
            <TabsTrigger value="session" className="rounded-lg">
              Session Questions
            </TabsTrigger>
          </TabsList>

          <Link to="/dashboard/questions/upload">
            <Button className="rounded-xl">
              <Upload />
              Upload Questions
            </Button>
          </Link>
        </div>
      </div>

      {/* ALL QUESTIONS */}
      <TabsContent value="all">
        <div className="space-y-4">
          <DataTable
            data={questionsTable.data}
            columns={questionsTable.columns}
            hasSelection
            selection={questionsTable}
            onSort={questionsTable.toggleSort}
            sortState={questionsTable.sort}
          />
          <TablePagination table={questionsTable} />
        </div>
      </TabsContent>

      {/* SESSION QUESTIONS */}
      <TabsContent value="session">
        <div className="space-y-4">
          <DataTable
            data={attemptsTable.data}
            columns={attemptsTable.columns}
            onSort={attemptsTable.toggleSort}
            sortState={attemptsTable.sort}
          />
          <TablePagination table={attemptsTable} />
        </div>
      </TabsContent>

    </Tabs>
  );
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

import { DataTable } from "../custom/DataTable";
import { questionAttemptColumns } from "../tables/columns/QuestionAttemptsColumns";

import type { QuestionAttemptRow } from "../../types/table";

type Attempt = {
  id: string;
  index: number;
  questions: QuestionAttemptRow[];
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionName?: string;
  attempts: Attempt[];
};

export function SessionAttemptsDialog({
  open,
  onOpenChange,
  sessionName,
  attempts,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-240">
        <DialogHeader>
          <DialogTitle>{sessionName} - Attempts</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <Accordion className="w-full">
            {attempts.map((a) => (
              <AccordionItem key={a.id} value={a.id}>
                <AccordionTrigger>
                  Attempt {a.index}
                </AccordionTrigger>

                <AccordionContent>
                  <DataTable
                    data={a.questions}
                    columns={questionAttemptColumns}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
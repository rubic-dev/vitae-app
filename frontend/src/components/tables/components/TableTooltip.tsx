import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";

import { cn } from "../../../lib/utils";

export function TableTooltip({
  children,
  content,
  hoverClassName,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  hoverClassName?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger> {/* asChild error */}
        <div className={cn("transition", hoverClassName)}>
          {children}
        </div>
      </TooltipTrigger>

      <TooltipContent className="max-w-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
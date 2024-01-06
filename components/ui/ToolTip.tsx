import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface ToolTipProps {
  content: string;
}

export function ToolTip({ content }: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            alt="question mark"
            width={15}
            height={15}
            src="/assets/question.svg"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[300px]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

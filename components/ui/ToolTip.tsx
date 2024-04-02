import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { motion } from "framer-motion";

interface ToolTipProps {
  content: string;
}

export function ToolTip({ content }: ToolTipProps) {
  // for mobile view, open on click
  const [isOpen, setIsOpen] = useState(false);
  const toggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    setIsMobile(window.innerWidth <= 768);

    // an event listener to update the state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array. Runs once on mount and clean up on unmount

  return isMobile ? (
    <div>
      <div className="relative">
        <button
          onClick={toggleTooltip}
          type="button"
          className="tooltip-trigger"
        >
          <Image
            alt="question mark"
            width={16}
            height={16}
            src="/assets/question.svg"
            className=""
          />
        </button>
        {isOpen && (
          <motion.div
            onClick={toggleTooltip}
            className="absolute bottom-10 z-[30] right-[-10rem] w-[30vh] bg-white shadow-xl border-[1px] border-neutral-200 text-neutral-900 text-xs rounded-[10px] py-2 px-3"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} // Define variants
            initial="hidden" // Initial state
            animate={isOpen ? "visible" : "hidden"} // Use variant names
            transition={{ duration: 0.2 }} // Add smooth transition durati
          >
            {content}
          </motion.div>
        )}
      </div>
    </div>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="hover:bg-primary-200 p-0.5 rounded-full"
          asChild
        >
          <Image
            alt="question mark"
            width={16}
            height={16}
            src="/assets/question.svg"
            className=""
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[300px]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

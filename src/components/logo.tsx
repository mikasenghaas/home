"use client";

import Link from "next/link";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function Logo() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href="/"
          className="disabled h-16 w-16 text-5xl font-bold focus:outline-none"
        >
          m
        </Link>
      </TooltipTrigger>
      <TooltipContent>Back Home</TooltipContent>
    </Tooltip>
  );
}

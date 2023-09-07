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
      <TooltipTrigger tabIndex={-1}>
        <Link
          href="/"
          className="block h-12 w-12 overflow-hidden rounded-md outline-accent-foreground"
        >
          <h1 className="-mt-1 text-5xl font-bold">m</h1>
        </Link>
      </TooltipTrigger>
      <TooltipContent>Back Home</TooltipContent>
    </Tooltip>
  );
}

"use client"

import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

function Butterfly() {
  return (
    <Link
      href="/"
      className="relative block h-12 w-12 overflow-hidden rounded-md outline-accent-foreground 2xl:h-12 2xl:w-12"
    >
      <Image
        src="/img/butterfly.png"
        alt="Prime Intellect"
        className="object-contain"
        fill
      />
    </Link>
  )
}

function M() {
  return (
    <Tooltip>
      <TooltipTrigger tabIndex={-1}>
        <Link
          href="/"
          className="block h-12 w-12 overflow-hidden rounded-md outline-accent-foreground 2xl:h-16 2xl:w-16"
        >
          <h1 className="-mt-1 text-5xl font-bold 2xl:text-6xl">m</h1>
        </Link>
      </TooltipTrigger>
      <TooltipContent>Back Home</TooltipContent>
    </Tooltip>
  );
}

export function Logo() {
  return (
    <div className="flex items-center space-x-8">
      <M />
    </div>
  );
}
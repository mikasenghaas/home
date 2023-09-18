"use client";

import * as React from "react";

import { Avatar } from "@/components/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTypewriter, useTypewriters } from "@/hooks/use-typewriter";

function HeroText() {
  const { message: startMessage } = useTypewriter({
    message: "Oh, and ",
    initialDelay: 1000,
    typing_interval_min: 95,
  });
  const { message: fact, selectedMessage: selectedFact } = useTypewriters({
    messages: [
      "I love my morning coffee ritual.",
      "AI research fascinates me.",
      "I ran the CPH Marathon 2023.",
      "I listen to UK hip-hop 74% of the time.",
      "I used to play football for FCSP.",
      "find me in the mountains on Sundays.",
      "",
    ],
    initial_delay: 2000,
  });

  return (
    <div className="mt-6 h-80 text-3xl font-medium leading-normal text-muted-foreground sm:h-96 sm:text-4xl md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal 2xl:h-[500px] 2xl:text-7xl 2xl:leading-normal">
      <strong>
        Hi <span className="inline-block animate-wiggle"> 👋🏻</span>, I&apos;m
        Mika.
      </strong>{" "}
      <span>I am a master student in computer and data science at </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href="https://epfl.ch" target="_blank">
            EPFL
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <span className="flex items-center gap-x-1 text-sm">
            École Polytechnique Fédérale de Lausanne
          </span>
        </TooltipContent>
      </Tooltip>
      <span>. {startMessage}</span>
      <span aria-label={selectedFact}>{fact}</span>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <Avatar />
      <HeroText />
    </>
  );
}

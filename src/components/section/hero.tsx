"use client";

import * as React from "react";

import { Avatar } from "@/components/avatar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTypewriter, useTypewriters } from "@/hooks/use-typewriter";
import { shuffle } from "@/lib/utils";

const facts = [
  "I love my morning coffee ritual.",
  ...shuffle([
    "I was a TA in the AddisCoder 2024 program.",
    "I train for the SF Marathon 2025.",
    "I am fascinated by nature-inspired algorithms for AI.",
    "I listen to UK hip-hop 74% of the time.",
    "one day I will open a café.",
    "I used to play football for St. Pauli.",
    "you can find me in the mountains on Sundays.",
    "I love learning.",
  ]),
];

function HeroText() {
  // const { message: startMessage } = useTypewriter({
  //   message: "Oh, and ",
  //   initialDelay: 1000,
  //   typing_interval_min: 95,
  // });

  // const { message: fact, selectedMessage: selectedFact } = useTypewriters({
  //   messages: facts,
  //   initial_delay: 2000,
  // });

  return (
    <div className="mt-6 h-80 text-3xl font-medium leading-normal text-muted-foreground sm:h-96 sm:text-4xl md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal 2xl:h-[500px] 2xl:text-7xl 2xl:leading-normal">
      <strong>
        Hi <span className="inline-block animate-wiggle"> 👋🏻</span>, I&apos;m
        Mika.
      </strong>{" "}
      <span>I am a master student at{" "}</span>
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
        <span> and research engineer at{" "}
          <a href="https://x.com/primeintellect" target="_blank">
            Prime Intellect
          </a>.
        </span>
      </Tooltip>
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

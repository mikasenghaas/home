import { useContext } from "react";

import { Aperture } from "lucide-react";

import Frosted from "@/components/frosted";
import { Logo } from "@/components/logo";
import ProfilePicture from "@/components/profile-picture";
import { Teaching } from "@/components/teaching";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { PostContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";

function Hero() {
  return (
    <>
      <ProfilePicture />
      <p className="mt-10 text-4xl leading-normal md:text-5xl md:leading-normal">
        <strong>
          Hi <span className="animate-bounce"> 👋🏻</span>, I&apos;m Mika.
        </strong>{" "}
        I am a master student in computer and data science at{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://epfl.ch" target="_blank">
              EPFL
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              École Polytechnique Fédérale de Lausanne
            </p>
          </TooltipContent>
        </Tooltip>
        . My main research interest is artificial intelligence.
      </p>
      <p className="mt-4 flex items-center gap-x-1 text-sm text-foreground">
        Press
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-accent-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
        for Menu
      </p>
    </>
  );
}

function Featured() {
  return (
    <Frosted className="mt-44 flex min-h-[500px] flex-col space-y-4 md:min-h-[300px] md:flex-row md:space-x-8 md:space-y-0">
      <Aperture className="h-8 w-8 md:h-12 md:w-12" />
      <div className="flex flex-col">
        <p className="mb-2 text-xs font-semibold text-accent-foreground">
          Featured
        </p>
        <a href="/teaching/mst">
          <h3 className="m-0 text-2xl md:text-4xl 2xl:text-5xl">
            Navigating Indoors With Computer Vision
          </h3>
        </a>
        <p className="mt-2 leading-tight">
          Deep Learning Approaches for Room-Level Indoor Localisation
        </p>
        <div className="mt-8 flex flex-1 flex-wrap items-end gap-x-2 gap-y-1">
          <Badge>Thesis</Badge>
          <Badge>Computer Vision</Badge>
          <Badge>Deep Learning</Badge>
        </div>
      </div>
    </Frosted>
  );
}

function About() {
  return (
    <div className="mt-44">
      <h2>A few words about me</h2>
      <p className="mt-4 text-xl leading-loose">
        I am a 21-year old student from Germany studying my{" "}
        <strong>BSc. Data Science</strong> at{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://itu.dk" target="_blank">
              ITU
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              IT Universitet København
            </p>
          </TooltipContent>
        </Tooltip>
        . Artificial intelligence is my primary passion within the data science
        field. I am deeply fascinated by the theory and application of machines
        that learn and am convinced that it is going to shape our future in ways
        we cannot imagine yet. In pursuit of learning within this field, I am
        writing my bachelor thesis in computer vision this spring. I am the
        founder of the artificial intelligence student organisation{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://aitu.group" target="_blank">
              AITU
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              Artificial Intelligence Community at ITU
            </p>
          </TooltipContent>
        </Tooltip>
        , where we create a community around the field of AI. Moreover, I
        organise the event{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://coffeetalks.itu.dk" target="_blank">
              Coffee Talks
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              Research-focused talk series at ITU
            </p>
          </TooltipContent>
        </Tooltip>
        and represent my university as a student ambassador.
        <br />
        Apart from my studies, I work as a teaching assistant at ITU, helping
        course managers to facilitate lectures and exercise sessions.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Teaching />
      <About />
    </>
  );
}

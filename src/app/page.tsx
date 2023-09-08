import Image from "next/image";

import { Logo } from "@/components/logo";
import ProfilePicture from "@/components/profile-picture";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

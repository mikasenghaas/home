import { Avatar } from "@/components/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Hero() {
  return (
    <>
      <Avatar />
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

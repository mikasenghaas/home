"use client";

import * as React from "react";

import {
  Calculator,
  Calendar,
  Command,
  Smile,
  Home,
  Paperclip,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { capitalize } from "@/lib/utils";

interface MenuProps {
  teachingPosts: string[];
  projectPosts: string[];
}
export function Menu({ teachingPosts, projectPosts }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  function opposite(theme: string | undefined) {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      default:
        return "system";
    }
  }

  function toggleTheme() {
    setTheme(opposite(resolvedTheme));
  }

  function navigate(url: string) {
    router.push(url);
    setOpen(false);
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={() => setOpen((open) => !open)}>
            <Command className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Open menu</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="flex items-center gap-x-1 text-sm">
            Open Menu
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-accent-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Back Home</span>
            </CommandItem>
            <CommandItem onSelect={() => toggleTheme()}>
              <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span>Switch to {capitalize(opposite(resolvedTheme))} Mode</span>
              <CommandShortcut>⌘J</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Teaching">
            {teachingPosts.map((post) => {
              return (
                <CommandItem
                  key={`teaching-${post}`}
                  onSelect={() =>
                    navigate(`/teaching/${post.split(".").at(0)}`)
                  }
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  <span>{post}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projectPosts.map((post) => {
              return (
                <CommandItem
                  key={`project-${post}`}
                  onSelect={() => navigate(`/project/${post.split(".").at(0)}`)}
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  <span>{post}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

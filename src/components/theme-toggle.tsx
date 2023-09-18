"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { capitalize } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const opposite = React.useCallback((theme: string | undefined) => {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      default:
        return "system";
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(opposite(resolvedTheme));
  }, [setTheme, opposite, resolvedTheme]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleTheme]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-x-1 text-sm">
          {capitalize(opposite(resolvedTheme))} Mode
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-accent-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

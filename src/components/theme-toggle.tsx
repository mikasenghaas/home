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
        <p>Switch to {capitalize(opposite(resolvedTheme))} Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}

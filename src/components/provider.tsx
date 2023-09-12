"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";

export default function Provider({
  posts,
  children,
}: {
  posts: Record<string, FrontmatterWithSlug[]>;
  children: React.ReactNode;
}) {
  return (
    <>
      <PostContext.Provider value={posts}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </PostContext.Provider>
    </>
  );
}

"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";

export default function Provider({
  postsFrontmatter,
  children,
}: {
  postsFrontmatter: Record<string, FrontmatterWithSlug[]>;
  children: React.ReactNode;
}) {
  return (
    <>
      <PostFrontmatterContext.Provider value={postsFrontmatter}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </PostFrontmatterContext.Provider>
    </>
  );
}

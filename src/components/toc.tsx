"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { useHeadings } from "@/hooks/use-headings";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import useScroll from "@/hooks/use-scroll";
import { useWindowSize } from "@/hooks/use-window-size";

export function TableOfContents() {
  const { headings } = useHeadings();
  const { scrollPosition, scrollPercentage } = useScroll();
  const { height } = useWindowSize();
  const [activeId, setActiveId] = React.useState("");
  useIntersectionObserver(setActiveId);

  return (
    <div className="fixed left-4 flex h-1/2 w-72 pointer-events-none" style={{ zIndex: -1 }}>
      <ProgressPrimitive.Root
        className={`relative hidden h-full w-1 overflow-hidden rounded-full bg-accent opacity-0 transition-opacity ${
          scrollPosition > 300 && "lg:opacity-100"
        } ${height > 2000 && "lg:block"}`}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-accent-foreground transition-all duration-75"
          style={{
            transform: `translateY(-${100 - (scrollPercentage || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
      <nav
        aria-label="Table of Contents"
        className={`hidden transition-opacity xl:block xl:flex-1 xl:opacity-0 ${
          scrollPosition > 600 && "xl:opacity-100"
        }`}
      >
        <ul className="pointer-events-auto">
          {headings.map((heading) => (
            <li key={heading.id} className="mb-4 list-none text-sm">
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={`font-light hover:text-accent-foreground ${
                  heading.id === activeId
                    ? "text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

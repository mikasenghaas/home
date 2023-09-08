"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import type { Heading } from "@/lib/types";

export function useHeadings() {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const headings = headingElements.map(({ innerText: title, id }) => ({
      id,
      title,
    }));

    setHeadings(headings);
  }, [pathname]);

  return { headings };
}

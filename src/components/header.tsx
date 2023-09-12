"use client";

import { Logo } from "@/components/logo";
import { Menu } from "@/components/menu";
import { ThemeToggle } from "@/components/theme-toggle";
import useScroll from "@/hooks/use-scroll";
import { Frontmatter, FrontmatterWithSlug } from "@/lib/types";

export function Header() {
  const { scrollPosition } = useScroll();

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 flex items-center backdrop-blur-md transition-all duration-300 ${
        scrollPosition > 35
          ? "border-b-0.5 min-h-[70px]"
          : "min-h-[120px] border-none"
      } border-b`}
    >
      <div className="container z-50 mx-auto flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-2">
          <Menu />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

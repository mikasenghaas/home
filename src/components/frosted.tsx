"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface FrostedProps {
  children: React.ReactNode;
  className?: string;
}
export function Frosted({ children, className, ...props }: FrostedProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = ev;
      const { x, y, width, height } = ref.current.getBoundingClientRect();

      // check current mouse position within container
      if (
        x <= clientX &&
        clientX <= x + width &&
        y <= clientY &&
        clientY <= y + height
      ) {
        const containerX = clientX - x;
        const containerY = clientY - y;

        ref.current.style.setProperty("--x", `${containerX}px`);
        ref.current.style.setProperty("--y", `${containerY}px`);
      }
    };

    // mousemove event listener
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-xl border p-8 before:pointer-events-none before:absolute before:left-0 before:top-0 before:-z-50 before:h-full before:w-full before:rounded-xl before:bg-[radial-gradient(circle_at_var(--x,_0px)_var(--y,_0px),hsl(var(--accent-foreground)),_transparent)] before:opacity-20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

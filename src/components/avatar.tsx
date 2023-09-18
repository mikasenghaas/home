"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Avatar() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-full 2xl:h-36 2xl:w-36">
      <Image
        src={`/img/mikasenghaas-${
          resolvedTheme !== "system" && resolvedTheme ? resolvedTheme : "dark"
        }.jpeg`}
        alt="Mika Senghaas Avatar"
        fill
      />
    </div>
  );
}

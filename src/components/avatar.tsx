"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Avatar() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={`/mikasenghaas-${
        resolvedTheme !== "system" && resolvedTheme ? resolvedTheme : "dark"
      }.jpeg`}
      alt="Mika Senghaas Avatar"
      style={{
        objectFit: "cover",
        borderRadius: "50px",
      }}
      width={100}
      height={100}
      quality={50}
    />
  );
}

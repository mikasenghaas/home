"use client";

import Image from "next/image";
import { ImageProps } from "next/image";

type MDXImageProps = ImageProps & {
  caption: string;
};
export function MDXImage(props: MDXImageProps) {
  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line */}
      <Image
        className="rounded-lg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
        {...props}
      />
      <p className="mt-2 text-sm italic text-muted-foreground">
        {props.caption}
      </p>
    </div>
  );
}

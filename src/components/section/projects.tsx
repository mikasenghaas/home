"use client";

import { useContext } from "react";
import * as React from "react";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";
import { renderMediumDate } from "@/lib/utils";

function ProjectBox({
  postFrontmatter,
  show,
}: {
  postFrontmatter: FrontmatterWithSlug;
  show: boolean;
}) {
  return (
    <Link
      href={`/project/${postFrontmatter.slug}`}
      className={`group hover:no-underline focus-visible:outline-offset-8 focus-visible:outline-accent-foreground ${
        !show && "hidden"
      }`}
    >
      <div className="cursor-pointer ">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-lg transition-all group-hover:shadow-glow group-hover:shadow-accent-foreground group-hover:outline group-hover:outline-1 group-hover:outline-accent-foreground group-active:scale-95"
        >
          <Image
            src={`/assets/${postFrontmatter.slug}.jpeg`}
            alt="test"
            fill={true}
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </AspectRatio>
        <div className="py-2">
          <h3 className="m-0 truncate text-lg tracking-wide text-foreground decoration-accent-foreground transition-all group-hover:underline 2xl:text-xl">
            {postFrontmatter.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {renderMediumDate(postFrontmatter.published)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function Project() {
  const posts = useContext(PostFrontmatterContext);
  const [collapsed, setCollapsed] = React.useState(true);
  const [slice, setSlice] = React.useState(3);

  React.useEffect(() => {
    function updateSlice() {
      const width = window.innerWidth;
      if (width < 640) {
        setSlice(4);
      } else {
        setSlice(3);
      }
    }

    window.addEventListener("resize", updateSlice);
    return () => {
      window.removeEventListener("resize", updateSlice);
    };
  }, []);

  if (!posts) return;

  const projectPostsFrontmatter = posts["project"];

  return (
    <Section>
      <h2 className="m-0">Recent Projects</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {projectPostsFrontmatter.slice(0, slice).map((postFrontmatter) => (
          <ProjectBox
            key={postFrontmatter.slug}
            postFrontmatter={postFrontmatter}
            show={true}
          />
        ))}
        {projectPostsFrontmatter.slice(slice).map((postFrontmatter) => (
          <ProjectBox
            key={postFrontmatter.slug}
            postFrontmatter={postFrontmatter}
            show={!collapsed}
          />
        ))}
      </div>
      <Button
        onClick={() => setCollapsed((collapsed) => !collapsed)}
        className="mx-auto mt-6 block"
      >
        See {collapsed ? "more" : "less"}
      </Button>
    </Section>
  );
}

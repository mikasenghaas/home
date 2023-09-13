"use client";

import { useContext } from "react";
import React from "react";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

import { PostContext } from "@/lib/context";
import { FrontmatterWithSlug, GroupedFrontmatterWithSlug } from "@/lib/types";

import { Button } from "../ui/button";

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
        <AspectRatio ratio={1 / 1} className="relative rounded-t-lg">
          <Image src="/openai1.jpeg" alt="test" fill={true} objectFit="cover" />
        </AspectRatio>
        <div className="py-2">
          <h3 className="m-0 truncate text-lg tracking-wide text-foreground transition-all group-hover:underline">
            {postFrontmatter.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(postFrontmatter.published).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function Project() {
  const posts = useContext(PostContext);
  const [collapsed, setCollapsed] = React.useState(true);
  if (!posts) return;

  const projectPostsFrontmatter = posts["project"];

  return (
    <>
      <h2>Recent Projects</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectPostsFrontmatter.slice(0, 3).map((postFrontmatter) => (
          <ProjectBox
            key={postFrontmatter.slug}
            postFrontmatter={postFrontmatter}
            show={true}
          />
        ))}
        {projectPostsFrontmatter.slice(3).map((postFrontmatter) => (
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
    </>
  );
}

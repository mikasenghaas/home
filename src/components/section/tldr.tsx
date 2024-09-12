"use client";

import { useContext } from "react";
import * as React from "react";
import Link from "next/link";

import { Section } from "@/components/section";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";
import { AuthorList } from "@/components/author";
import { Button } from "../ui/button";
import { Frosted } from "../frosted";
import { cn } from "@/lib/utils";

function Title({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={`/tldr/${slug}`}><h3 className="m-0">{title}</h3></Link>
  );
}

export function Organisation({ organisation, className }: { organisation: string | undefined, className?: string }) {
  if (!organisation) return null;
  return <span className={cn("text-accent-foreground text-lg font-light", className)}>{organisation}</span>;
}

export function Released({ released, className }: { released: string | undefined, className?: string }) {
    if (!released) return null;
    return <p className={cn("text-muted-foreground text-lg font-light", className)}>({new Date(released).getFullYear()})</p>;
}

function ResearchItem({
  postFrontmatter,
}: {
  postFrontmatter: FrontmatterWithSlug;
}) {
  return (
    <div>
      <Title title={postFrontmatter.title} slug={postFrontmatter.slug} />
      <div className="flex flex-row items-center space-x-1">
        <Organisation organisation={postFrontmatter.organisation} />
        <span className="mx-1 text-muted-foreground">•</span>
        <AuthorList authors={postFrontmatter.authors} short />
        <Released released={postFrontmatter.released} />
      </div>
    </div>
  );
}

function ResearchItems({ posts }: { posts: FrontmatterWithSlug[] }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const slice = 3

  return (
      <>
      <div className="flex flex-col space-y-8">
        {posts.slice(0, collapsed ? slice : posts.length).map((postFrontmatter) => (
          <ResearchItem
            key={postFrontmatter.slug}
            postFrontmatter={postFrontmatter}
          />
        ))}
      </div>
      {posts.length > slice && <Button
        onClick={() => setCollapsed((collapsed) => !collapsed)}
        className="mx-auto mt-6 block"
      >
        See {collapsed ? "more" : "less"}
      </Button>}
    </>
  );
}

export function TLDR() {
  const posts = useContext(PostFrontmatterContext);
  if (!posts) return;

  return (
    <Section>
      <Frosted className="before:opacity-10">
        <h2 className="mt-0">TL;DR 📮</h2>
        <p className="mt-4 mb-8 leading-snug">
            I enjoy reading academic papers and well-written technical blog
            posts.  I capture the key ideas and takeaways in five concise bullet
            points.  Sometimes, five is not enough - in that case, there is a
            <i>Too Short; Want More</i> (TSWM) button to get a more detailed
            summary.
        </p>
        <ResearchItems posts={posts["tldr"]} />
      </Frosted>
    </Section>
  );
}
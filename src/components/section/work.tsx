"use client";

import { useContext } from "react";
import * as React from "react";

import { Section } from "@/components/section";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";
import type { Author, Link } from "@/lib/types";
import { cn } from "@/lib/utils";

function Author({ author, className }: { author: Author; className: string }) {
  if (!author) return null;

  if (author.href) {
    return (
      <a
        href={author.href}
        target="_blank"
        className={cn(
          "cursor-pointer text-nowrap after:content-[','] last:after:content-none",
          className,
        )}
      >
        {`${author.firstName.at(0)}. ${author.lastName}`}
      </a>
    );
  } else {
    return (
      <span
        className={cn(
          "text-nowrap after:content-[','] last:after:content-none",
          className,
        )}
      >
        {`${author.firstName.at(0)}. ${author.lastName}`}
      </span>
    );
  }
}

function AuthorList({ authors }: { authors: Author[] | undefined }) {
  if (!authors) return null;
  return (
    <div className="flex flex-wrap items-center space-x-1 overflow-auto text-muted-foreground">
      {authors.map((author) => (
        <Author
          key={`${author.firstName.toLowerCase()}_${author.lastName.toLowerCase()}`}
          author={author}
          className="text-base font-light text-muted-foreground sm:text-lg"
        />
      ))}
    </div>
  );
}

function LinkList({ links }: { links: Link[] | undefined }) {
  if (!links) return null;

  return (
    <div className="flex flex-wrap items-center space-x-1">
      {links.map((link) => (
        <a
          href={link.href}
          key={link.title}
          target="_blank"
          className="text-nowrap text-base font-light after:content-[','] last:after:content-none sm:text-lg"
        >
          {link.title}
        </a>
      ))}
    </div>
  );
}

function WorkItem({
  postFrontmatter,
}: {
  postFrontmatter: FrontmatterWithSlug;
}) {
  return (
    <div>
      <h3 className="m-0">{postFrontmatter.title}</h3>
      <AuthorList authors={postFrontmatter.authors} />
      <LinkList links={postFrontmatter.links} />
    </div>
  );
}

function YearlyWorkItems({
  year,
  posts,
}: {
  year: number;
  posts: FrontmatterWithSlug[];
}) {
  return (
    <div>
      <p className="mb-4 mt-14 text-sm">{year}</p>
      <div className="flex flex-col space-y-8 2xl:space-y-12">
        {posts.map((post) => (
          <WorkItem key={post.slug} postFrontmatter={post} />
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const posts = useContext(PostFrontmatterContext);

  if (!posts) return;

  const workPostsFrontmatter = posts["work"];

  // compute map of work posts by year
  let workPostsFrontmatterByYear = workPostsFrontmatter.reduce(
    (acc, postFrontmatter) => {
      const year = new Date(postFrontmatter.published).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(postFrontmatter);
      return acc;
    },
    {} as Record<string, FrontmatterWithSlug[]>,
  );

  // years in descending order
  let years = Object.keys(workPostsFrontmatterByYear).sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });

  return (
    <Section>
      <h2 className="m-0">Work & Publications</h2>
      {years.map((year) => (
        <YearlyWorkItems
          key={year}
          year={parseInt(year)}
          posts={workPostsFrontmatterByYear[year]}
        />
      ))}
    </Section>
  );
}

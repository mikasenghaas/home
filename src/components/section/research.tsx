"use client";

import { useContext } from "react";
import * as React from "react";

import { Section } from "@/components/section";
import { AuthorList } from "@/components/author";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug } from "@/lib/types";
import type { Link } from "@/lib/types";

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

function ResearchItem({
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

function YearlyResearchItems({
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
          <ResearchItem key={post.slug} postFrontmatter={post} />
        ))}
      </div>
    </div>
  );
}

export function Research() {
  const posts = useContext(PostFrontmatterContext);

  if (!posts) return;

  const researchPostsFrontmatter = posts["research"];

  // compute map of work posts by year
  let researchPostsFrontmatterByYear = researchPostsFrontmatter.reduce(
    (acc, postFrontmatter) => {
      const year = new Date(postFrontmatter.published).getFullYear();
      if (!postFrontmatter.publish) return acc;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(postFrontmatter);
      return acc;
    },
    {} as Record<string, FrontmatterWithSlug[]>,
  );

  // years in descending order
  let years = Object.keys(researchPostsFrontmatterByYear).sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });

  return (
    <Section>
      <h2 className="m-0">Research</h2>
      {years.map((year) => (
        <YearlyResearchItems
          key={year}
          year={parseInt(year)}
          posts={researchPostsFrontmatterByYear[year]}
        />
      ))}
    </Section>
  );
}

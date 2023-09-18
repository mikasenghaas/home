"use client";

import { useContext } from "react";

import Link from "next/link";

import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PostFrontmatterContext } from "@/lib/context";
import { FrontmatterWithSlug, GroupedFrontmatterWithSlug } from "@/lib/types";
import { renderShortDate } from "@/lib/utils";

function TeachingBox({
  postFrontmatter,
}: {
  postFrontmatter: FrontmatterWithSlug;
}) {
  return (
    <Link
      href={`/teaching/${postFrontmatter.slug}`}
      className="group hover:no-underline focus-visible:-outline-offset-[2px] focus-visible:outline-accent-foreground"
    >
      <div className="flex h-16 cursor-pointer items-center gap-x-2 rounded-lg p-4 transition-all group-hover:bg-accent sm:gap-x-6 ">
        <span className="w-1/5 text-xs text-muted-foreground sm:block md:w-auto">
          {renderShortDate(postFrontmatter.published)}
        </span>
        <span className="flex-1 truncate text-base tracking-wide text-foreground transition-all group-hover:text-accent-foreground md:text-lg">
          {postFrontmatter.title}
        </span>
      </div>
    </Link>
  );
}

export function Teaching() {
  const posts = useContext(PostFrontmatterContext);
  if (!posts) return;

  const teachingPosts = posts["teaching"];

  const groupedTeachingPosts = teachingPosts.reduce((acc, post) => {
    const course = post.course;
    if (!course) {
      return acc;
    }
    if (Object.keys(acc).includes(course)) {
      return { ...acc, [course]: [post, ...acc[course]] };
    } else {
      return { ...acc, [course]: [post] };
    }
  }, {} as GroupedFrontmatterWithSlug);

  return (
    <Section className="mb-20">
      <h2 className="m-0 mb-8">Teaching Material</h2>
      {Object.keys(groupedTeachingPosts).map((course) => {
        return (
          <Accordion key={course} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="m-0 truncate group-hover:underline">
                  {course}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {groupedTeachingPosts[course].map((postFrontmatter) => (
                  <TeachingBox
                    key={postFrontmatter.slug}
                    postFrontmatter={postFrontmatter}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </Section>
  );
}

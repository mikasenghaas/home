import React from "react";

import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";

import MDXRemoteWrapper from "@/components/mdx-remote-wrapper";
import { Badge } from "@/components/ui/badge";
import type { Frontmatter } from "@/lib/types";
import { readFile, readDir, getPostDir, getPostPath } from "@/lib/utils";

type PostTypes = "teaching" | "project";

interface PostProps {
  slug: string;
  type?: PostTypes;
}

const options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

export default async function Post({ slug, type }: PostProps) {
  const content = await readFile(getPostPath(slug, type));
  const serializedContent = await serialize<
    Record<string, unknown>,
    Frontmatter
  >(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      /* @ts-ignore, TODO: rehypeHighlight type mismatch */
      rehypePlugins: [rehypeKatex, [rehypePrettyCode, options]],
      format: "mdx",
    },
    parseFrontmatter: true,
  });
  const { frontmatter } = serializedContent;

  return (
    <>
      <h1 className="py-8 text-5xl xl:text-6xl 2xl:text-7xl">
        {frontmatter.title}
      </h1>
      <div className="flex items-center space-x-2">
        <p className="text-lg font-medium text-foreground">
          {new Date(frontmatter.published.replace(/-/g, "/")).toLocaleString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" },
          )}
        </p>
        <Badge className="select-none bg-accent text-xs text-accent-foreground transition-none">
          {readingTime(content).text}
        </Badge>
      </div>
      <p className="mb-8">
        Last Updated{" "}
        {new Date(frontmatter.published.replace(/-/g, "/")).toLocaleString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )}
      </p>
      <MDXRemoteWrapper {...serializedContent} />
    </>
  );
}

export async function generateStaticParamsHelper(type?: string) {
  const posts = await readDir(getPostDir(type));

  return posts.map((post) => ({
    slug: post.split(".").at(0),
  }));
}

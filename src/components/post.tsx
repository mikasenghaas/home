import React from "react";

import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

import MDXRemoteWrapper from "@/components/mdx-remote-wrapper";
import { Badge } from "@/components/ui/badge";
import type { Frontmatter } from "@/lib/types";
import {
  readFile,
  readDir,
  getPostDir,
  getPostPath,
  getFrontmatter,
} from "@/lib/utils";

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
      rehypePlugins: [rehypeKatex, [rehypePrettyCode, options], rehypeSlug],
      format: "mdx",
    },
    parseFrontmatter: true,
  });
  const { frontmatter } = serializedContent;

  return (
    <>
      <h1 className="py-8 text-4xl xl:text-5xl 2xl:text-6xl">
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

export async function generateMetadataHelper(
  type: string,
  slug: string,
): Promise<Metadata> {
  const frontmatter = await getFrontmatter(getPostPath(slug, type));

  // formatting
  const title = `${frontmatter.title} | Mika Senghaas`;
  const description =
    frontmatter.description ||
    `${
      type === "project" ? "A project" : "Teaching material"
    } by Mika Senghaas`;
  const published = new Date(frontmatter.published).toISOString();

  return {
    title: title,
    description: description,
    keywords: frontmatter.tags,
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Mika Senghaas" }],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: published,
      authors: ["Mika Senghaas"],
    },
    twitter: {
      title: title,
      description: description,
    },
  };
}

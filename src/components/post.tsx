import React from "react";

import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

import MDXRemoteWrapper from "@/components/mdx-remote-wrapper";
import { MDXImage } from "@/components/mdx/image";
import { Badge } from "@/components/ui/badge";
import type { Frontmatter } from "@/lib/types";
import {
  readFile,
  readDir,
  getPostDir,
  getPostPath,
  getFrontmatter,
  renderLongDate,
} from "@/lib/utils";

type PostTypes = "teaching" | "project";

interface PostProps {
  slug: string;
  type?: PostTypes;
}

const components = { Image: MDXImage };

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
      <h1 className="m-0 py-8 text-5xl sm:text-6xl 2xl:text-7xl">
        {frontmatter.title}
      </h1>
      <div className="flex items-center space-x-2">
        <p className="text-base font-medium text-foreground sm:text-lg 2xl:text-xl">
          {renderLongDate(frontmatter.published)}
        </p>
        <Badge className="select-none bg-accent text-xs text-accent-foreground transition-none 2xl:text-sm">
          {readingTime(content).text}
        </Badge>
      </div>
      <p className="mb-12 text-sm sm:text-base 2xl:text-xl">
        Last Updated {renderLongDate(frontmatter.lastEdited)}
      </p>
      <MDXRemoteWrapper {...serializedContent} components={components} />
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

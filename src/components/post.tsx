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
import { MDXList, MDXListItem } from "@/components/mdx/list";
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
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Organisation, Released} from "@/components/section/tldr";
import { AuthorList } from "@/components/author";
import { ArxivButton } from "./arxiv-button";

type PostTypes = "teaching" | "project" | "tldr";


const options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

function TLDRHeader({ frontmatter }: { frontmatter: Frontmatter }) {
  return (
    <>
      <h1 className="m-0 mt-12 text-4xl sm:text-5xl 2xl:text-6xl">
        {frontmatter.title}
      </h1>
      <div className="flex items-center space-x-2 mb-8 mt-2">
        <Organisation organisation={frontmatter.organisation} className="truncate"/>
        <span className="mx-1 text-muted-foreground">•</span>
        <AuthorList authors={frontmatter.authors} />
        <Released released={frontmatter.released} />
      </div>
      <div className="flex flex-row items-center justify-between mb-12">
        <div className="flex flex-col text-base">
          <span className="font-medium text-foreground">{renderLongDate(frontmatter.published)}</span>
          <span className="text-muted-foreground">Last Updated {renderLongDate(frontmatter.lastEdited)}</span>
        </div>
        <ArxivButton link={frontmatter.links?.at(0)} />
      </div>
    </>
  )
}

function RegularHeader({ frontmatter, readingTime }: { frontmatter: Frontmatter, readingTime: string }) {
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
          {readingTime}
        </Badge>
      </div>
      <p className="mb-12 text-sm sm:text-base 2xl:text-xl">
        Last Updated {renderLongDate(frontmatter.lastEdited)}
      </p>
    </>
  )
}

function PostHeader({ frontmatter, readingTime, type }: { frontmatter: Frontmatter, readingTime: string, type: PostTypes }) {
    if (type === "tldr") {
      return <TLDRHeader frontmatter={frontmatter} />
    } else {
      return <RegularHeader frontmatter={frontmatter} readingTime={readingTime} />
    }
  }

function PostBody({ serializedContent }: { serializedContent: MDXRemoteSerializeResult<Record<string, unknown>, Frontmatter> }) {
  const components = { Image: MDXImage, List: MDXList, ListItem: MDXListItem };

  return <MDXRemoteWrapper {...serializedContent} components={components} />
}

interface PostProps {
  slug: string;
  type: PostTypes;
}

export default async function Post({ slug, type }: PostProps) {
  const content = await readFile(getPostPath(slug, type));
  const serializedContent = await serialize<
    Record<string, unknown>,
    Frontmatter
  >(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      /* @ts-ignore */
      rehypePlugins: [rehypeKatex, [rehypePrettyCode, options], rehypeSlug],
      format: "mdx",
    },
    parseFrontmatter: true,
  });
  const { frontmatter } = serializedContent;

  return (
    <>
      <PostHeader frontmatter={frontmatter} readingTime={readingTime(content).text} type={type} />
      <PostBody serializedContent={serializedContent} />
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
    `${type === "project" ? "A project" : (type === "tldr" ? "A Paper Summary" : "Teaching material")} by Mika Senghaas`;
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

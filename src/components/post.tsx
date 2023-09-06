import React from "react";

import { serialize } from "next-mdx-remote/serialize";

import MDXRemoteWrapper from "@/components/mdx-remote-wrapper";
import { readFile, readDir, getPostDir, getPostPath } from "@/lib/utils";

type PostTypes = "teaching" | "project";

interface PostProps {
  slug: string;
  type?: PostTypes;
}

export default async function Post({ slug, type }: PostProps) {
  const content = await readFile(getPostPath(slug, type));
  const serializedContent = await serialize(content);

  return (
    <>
      <h1>{slug}</h1>
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

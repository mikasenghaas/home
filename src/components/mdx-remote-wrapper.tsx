"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

/* INFO: needed because next-mdx-remote only works client-side */
export default function MDXRemoteWrapper(props: MDXRemoteProps) {
  return <MDXRemote {...props} />;
}

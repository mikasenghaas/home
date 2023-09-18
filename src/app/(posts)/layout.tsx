import { Metadata } from "next";

import { TableOfContents } from "@/components/toc";

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <>
      <TableOfContents />
      <div id="post" className="container px-0 lg:px-[4rem]">
        {children}
      </div>
    </>
  );
}

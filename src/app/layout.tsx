import * as React from "react";

import { cx } from "class-variance-authority";
import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Provider from "@/components/provider";
import { getPostsFrontmatter } from "@/lib/utils";

import "./globals.css";
import "./katex.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const postsFrontmatter = await getPostsFrontmatter();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cx("flex w-full justify-center")}>
        <Provider postsFrontmatter={postsFrontmatter}>
          <div className="container flex min-h-screen flex-col">
            <Header />
            <div className="mt-40 flex-1 sm:mt-60">{children}</div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

export { metadata } from "@/lib/meta";

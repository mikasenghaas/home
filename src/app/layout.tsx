import * as React from "react";

import { cx } from "class-variance-authority";
import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Provider from "@/components/provider";
import { FrontmatterWithSlug } from "@/lib/types";
import { getFrontmatter, getPostDir, getPostPath, readDir } from "@/lib/utils";

import "./globals.css";
import "./katex.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get post names
  const teachingPosts = await readDir(getPostDir("teaching"));
  const projectPosts = await readDir(getPostDir("project"));

  // get post slugs
  const getSlug = (fileName: string) => fileName.split(".").at(0) || "";
  const teachingPostSlugs = teachingPosts.map(getSlug);
  const projectPostSlugs = projectPosts.map(getSlug);

  // get post frontmatter
  const getFrontmatterFromSlug = (type: string) => async (slug: string) => {
    const frontmatter = await getFrontmatter(getPostPath(slug, type));
    return { slug, ...frontmatter };
  };
  const teachingPostFrontmatter = await Promise.all(
    teachingPostSlugs.map(getFrontmatterFromSlug("teaching")),
  );
  const projectPostsFrontmatter = await Promise.all(
    projectPostSlugs.map(getFrontmatterFromSlug("project")),
  );

  // sort post frontmatter
  const byPublishingDate = (a: FrontmatterWithSlug, b: FrontmatterWithSlug) =>
    a.published < b.published ? 1 : -1;
  const sortedTeachingPostFrontmatter =
    teachingPostFrontmatter.sort(byPublishingDate);
  const sortedProjectPostFrontmatter =
    projectPostsFrontmatter.sort(byPublishingDate);

  const posts = {
    teaching: sortedTeachingPostFrontmatter,
    project: sortedProjectPostFrontmatter,
  };

  return (
    <html lang="en">
      <body className={cx("flex w-full justify-center")}>
        <Provider posts={posts}>
          <div className="container flex min-h-screen flex-col">
            <Header />
            <div className="mt-60 flex-1">{children}</div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Mika Senghaas",
  description: "Master's student in Data Science at EPFL",
  metadataBase: new URL("https://www.mikasenghaas.de"),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16181d" },
    { media: "(prefers-color-scheme: dark)", color: "#f9fafb" },
  ],
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mika Senghaas",
    description: "Master's student in Data Science at EPFL",
    url: "https://mikasenghaas.de",
    siteName: "Mika Senghaas",
    images: [
      {
        url: "https://mikasenghaas.de/banner.jpeg",
        width: 1008,
        height: 630,
        alt: "Mika Senghaas Avatar",
      },
    ],
    locale: "en_UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mika Senghaas",
    description: "Master's student in Data Science at EPFL",
    creator: "@mikasenghaas",
    images: ["/banner.jpeg"],
  },
};

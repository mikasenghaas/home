import { type ClassValue, clsx } from "clsx";
import fs from "fs";
import moment from "moment";
import path from "path";
import { twMerge } from "tailwind-merge";
import yaml from "yaml";

import { Frontmatter, FrontmatterWithSlug } from "./types";

// shadcn ui
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPostPath(slug: string, type?: string) {
  try {
    return path.join(
      process.cwd(),
      "src",
      "posts",
      type ? type : "",
      slug + ".mdx",
    );
  } catch {
    return path.join(
      process.cwd(),
      "src",
      "posts",
      type ? type : "",
      slug + ".md",
    );
  }
}

export function getPostDir(type?: string) {
  return path.join(process.cwd(), "src", "posts", type ? type : "");
}

export function readFile(filePath: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) reject(err);
      else resolve(content);
    });
  });
}

export async function getFrontmatter(filePath: string) {
  const content = await readFile(filePath);
  const frontmatter = content.match(/---(.|\n)*?---/)?.[0].slice(3, -3);

  return yaml.parse(frontmatter as string) as Frontmatter;
}

export function readDir(filePath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function choice(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export async function getPostsFrontmatter() {
  // get post names
  const teachingPosts = await readDir(getPostDir("teaching"));
  const projectPosts = await readDir(getPostDir("project"));
  const workPosts = await readDir(getPostDir("work"));

  // get post slugs
  const getSlug = (fileName: string) => fileName.split(".").at(0) || "";
  const teachingPostSlugs = teachingPosts.map(getSlug);
  const projectPostSlugs = projectPosts.map(getSlug);
  const workPostSlugs = workPosts.map(getSlug);

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
  const workPostsFrontmatter = await Promise.all(
    workPostSlugs.map(getFrontmatterFromSlug("work")),
  );

  // sort post frontmatter
  const byPublishingDate = (a: FrontmatterWithSlug, b: FrontmatterWithSlug) =>
    moment(a.published, "MM-DD-YYYY") < moment(b.published, "MM-DD-YYYY")
      ? 1
      : -1;
  const sortedTeachingPostFrontmatter =
    teachingPostFrontmatter.sort(byPublishingDate);
  const sortedProjectPostFrontmatter =
    projectPostsFrontmatter.sort(byPublishingDate);
  const sortedWorkPostFrontmatter = workPostsFrontmatter.sort(byPublishingDate);

  const posts = {
    teaching: sortedTeachingPostFrontmatter,
    project: sortedProjectPostFrontmatter,
    work: sortedWorkPostFrontmatter,
  };

  return posts;
}

export function getCourseInformation(course: string) {
  switch (course) {
    case "Algorithms & Data Structures":
      return {
        title: "Algorithms & Data Structures",
        university: "IT University of Copenhagen",
      };
    case "Linear Algebra & Optimisation":
      return {
        title: "Linear Algebra & Optimisation",
        university: "IT University of Copenhagen",
      };
    case "Applied Statistics":
      return {
        title: "Applied Statistics",
        university: "IT University of Copenhagen",
      };
    case "Machine Learning":
      return {
        title: "Machine Learning",
        university: "IT University of Copenhagen",
      };
    default:
      return {
        title: "Unknown Course",
        university: "Unknown University",
      };
  }
}

export function renderShortDate(date: string) {
  return moment(date, "MM-DD-YYYY").format("MMM YY");
}

export function renderMediumDate(date: string) {
  return moment(date, "MM-DD-YYYY").format("MMMM YYYY");
}

export function renderLongDate(date: string) {
  return moment(date, "MM-DD-YYYY").format("Do MMMM YYYY");
}

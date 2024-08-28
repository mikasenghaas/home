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
  // Get all subdirectories of src/posts
  const postTypes = await readDir(getPostDir());

  // Function to process each post type
  const processPostType = async (type: string) => {
    const posts = await readDir(getPostDir(type));
    const getSlug = (fileName: string) => fileName.split(".").at(0) || "";
    const postSlugs = posts.map(getSlug);

    const getFrontmatterFromSlug = async (slug: string) => {
      const frontmatter = await getFrontmatter(getPostPath(slug, type));
      return { slug, ...frontmatter };
    };

    const postFrontmatter = await Promise.all(
      postSlugs.map(getFrontmatterFromSlug)
    );

    const byPublishingDate = (a: FrontmatterWithSlug, b: FrontmatterWithSlug) =>
      moment(a.published, "YYYY-MM-DD") < moment(b.published, "YYYY-MM-DD")
        ? 1
        : -1;

    return postFrontmatter.sort(byPublishingDate);
  };

  // Process all post types
  const posts = await Promise.all(
    postTypes.map(async (type) => [type, await processPostType(type)])
  );

  // Convert the array of [type, posts] to an object
  return Object.fromEntries(posts);
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
  return moment(date, "YYYY-MM-DD").format("MMM YY");
}

export function renderMediumDate(date: string) {
  return moment(date, "YYYY-MM-DD").format("MMMM YYYY");
}

export function renderLongDate(date: string) {
  return moment(date, "YYYY-MM-DD").format("Do MMMM YYYY");
}

import { type ClassValue, clsx } from "clsx";
import fs from "fs";
import moment from "moment";
import path from "path";
import { twMerge } from "tailwind-merge";
import yaml from "yaml";

import { Frontmatter } from "./types";

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

export function renderShortDate(date: string) {
  return moment(date, "MM-DD-YYYY").format("MMM YY");
}

export function renderLongDate(date: string) {
  return moment(date, "MM-DD-YYYY").format("Do MMMM YYYY");
}

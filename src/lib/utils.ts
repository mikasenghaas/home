import path from "path";
import fs from "fs";

export function getPostPath(slug: string, type?: string) {
  return path.join(
    process.cwd(),
    "src",
    "posts",
    type ? type : "",
    slug + ".md"
  );
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

export function readDir(filePath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

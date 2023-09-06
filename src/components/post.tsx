import { readFile, readDir, getPostDir, getPostPath } from "@/lib/utils";

type PostTypes = "teaching" | "project";

interface PostProps {
  slug: string;
  type?: PostTypes;
}

export default async function Post({ slug, type }: PostProps) {
  const content = await readFile(getPostPath(slug, type));

  return (
    <>
      <h1>{slug}</h1>
      <p>{content}</p>
    </>
  );
}

export async function generateStaticParamsHelper(type?: string) {
  const posts = await readDir(getPostDir(type));

  return posts.map((post) => ({
    slug: post.split(".").at(0),
  }));
}

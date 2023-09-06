import Post, { generateStaticParamsHelper } from "@/components/post";

interface ProjectPostProps {
  params: { slug: string };
}

export default async function ProjectPost({
  params: { slug },
}: ProjectPostProps) {
  return <Post slug={slug} type="project" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("teaching");

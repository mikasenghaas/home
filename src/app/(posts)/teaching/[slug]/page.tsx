import Post, { generateStaticParamsHelper } from "@/components/post";

interface TeachingPostProps {
  params: { slug: string };
}

export default async function TeachingPost({
  params: { slug },
}: TeachingPostProps) {
  return <Post slug={slug} type="teaching" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("teaching");

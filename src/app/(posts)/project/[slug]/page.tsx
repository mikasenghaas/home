import { ResolvingMetadata } from "next";

import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface ProjectPostProps {
  params: { slug: string };
}

export default async function ProjectPost({
  params: { slug },
}: ProjectPostProps) {
  return <Post slug={slug} type="project" />;
}

export const dynamicParams = false;
export const generateStaticParams = () => generateStaticParamsHelper("project");
export const generateMetadata = (
  { params }: Props,
  parent: ResolvingMetadata,
) => generateMetadataHelper("project", params.slug);

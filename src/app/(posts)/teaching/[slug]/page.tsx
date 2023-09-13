import { ResolvingMetadata } from "next";

import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

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
export const generateMetadata = (
  { params }: Props,
  parent: ResolvingMetadata,
) => generateMetadataHelper("teaching", params.slug);

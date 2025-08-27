import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface TeachingPostProps {
  params: Promise<{ slug: string }>;
}

export default async function TeachingPost({
  params,
}: TeachingPostProps) {
  const { slug } = await params;
  return <Post slug={slug} type="teaching" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("teaching");
export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return generateMetadataHelper("teaching", slug);
};

import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface TLDRPostProps {
  params: Promise<{ slug: string }>;
}

export default async function TLDRPost({
  params,
}: TLDRPostProps) {
  const { slug } = await params;
  return <Post slug={slug} type="tldr" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("tldr");
export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return generateMetadataHelper("tldr", slug);
};

import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface TLDRPostProps {
  params: { slug: string };
}

export default async function TLDRPost({
  params: { slug },
}: TLDRPostProps) {
  return <Post slug={slug} type="tldr" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("tldr");
export const generateMetadata = ({ params }: Props) =>
  generateMetadataHelper("tldr", params.slug);

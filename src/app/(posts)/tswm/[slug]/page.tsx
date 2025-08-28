import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface TSWMPostProps {
  params: { slug: string };
}

export default async function TSWMPost({
  params: { slug },
}: TSWMPostProps) {
  return <Post slug={slug} type="tswm" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("tswm");
export const generateMetadata = ({ params }: Props) =>
  generateMetadataHelper("tswm", params.slug);

import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface TSWMPostProps {
  params: Promise<{ slug: string }>;
}

export default async function TSWMPost({
  params,
}: TSWMPostProps) {
  const { slug } = await params;
  return <Post slug={slug} type="tswm" />;
}

export const dynamicParams = false;
export const generateStaticParams = () =>
  generateStaticParamsHelper("tswm");
export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return generateMetadataHelper("tswm", slug);
};

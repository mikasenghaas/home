import Post, {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "@/components/post";
import { Props } from "@/lib/types";

interface ProjectPostProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPost({
  params,
}: ProjectPostProps) {
  const { slug } = await params;
  return <Post slug={slug} type="project" />;
}

export const dynamicParams = false;
export const generateStaticParams = () => generateStaticParamsHelper("project");
export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return generateMetadataHelper("project", slug);
};

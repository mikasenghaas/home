import Head from "next/head";
import { Flex, Box, Heading, Text, Badge } from "@chakra-ui/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import readingTime from "reading-time";

import Subpage from "@/components/subpage";
import Scroll from "@/components/scroll";
import { scanDirectory, scanFile } from "@/lib/helpers";

export async function getStaticPaths() {
  let allPaths = await scanDirectory("src/posts/log/*.mdx");

  const paths = allPaths.map((projectPath: any) => {
    const splitProjectPath = projectPath.split("/");
    const log = splitProjectPath.at(-1).split(".").at(0);
    return { params: { log } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { log } = context.params;
  const article = await scanFile(`src/posts/log/${log}.mdx`);
  const mdxSource = await serialize(article, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
      format: "mdx",
    },
    parseFrontmatter: true,
  });

  return {
    props: {
      source: mdxSource,
    },
  };
}

export default function Project({ source }: any) {
  const { frontmatter } = source;

  return (
    <>
      <Head>
        <title>[Log] {frontmatter.title} | Mika Senghaas</title>
        <meta name="description" content={frontmatter.summary} />
        <meta property="og:title" content={`[Log] ${frontmatter.title} | Mika Senghaas`} />
        <meta name="og:description" content={frontmatter.summary} />
        <meta property="og:image" content={frontmatter.img} />
      </Head>
      <Scroll />

      <Subpage>
        <Heading mb={5} fontSize={{ base: "4xl", md: "6xl" }} fontWeight={500}>
          {frontmatter.title}
        </Heading>
        <Text fontSize="md" variant="custom">
          {new Date(frontmatter.published.replace(/-/g, "/")).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </Text>
        <Flex>
          {frontmatter.tags.map((tag: string) => {
            return (
              <Badge key={tag} fontSize="xs" mb={10} mt={2} mr={1} variant="custom">
                {tag}
              </Badge>
            );
          })}
        </Flex>
        <MDXRemote {...source} />
      </Subpage>
    </>
  );
}

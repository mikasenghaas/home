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
  let allProjectsPaths = await scanDirectory("src/posts/projects/*.mdx");

  const paths = allProjectsPaths.map((projectPath: any) => {
    const splitProjectPath = projectPath.split("/");
    const project = splitProjectPath.at(-1).split(".").at(0);
    return { params: { project } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { project } = context.params;
  const article = await scanFile(`src/posts/projects/${project}.mdx`);
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
      project: project,
    },
  };
}

export default function Project({ source }: any) {
  const { frontmatter } = source;

  return (
    <>
      <Head>
        <title>{frontmatter.title} | Mika Senghaas</title>
        <meta name="description" content={frontmatter.summary} />
        <meta property="og:title" content={`${frontmatter.title} | Mika Senghaas`} />
        <meta name="og:description" content={`A post about {frontmatter.title}`} />
        <meta property="og:image" content={frontmatter.img} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary"></meta>
      </Head>
      <Scroll />

      <Subpage>
        <Heading mb={5} fontSize="6xl" fontWeight={500}>
          {frontmatter.title}
        </Heading>
        <Text fontSize="md" variant="custom">
          {new Date(frontmatter.published).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
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

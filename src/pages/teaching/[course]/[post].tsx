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
import HeaderTitle from "@/components/header-title";
import Scroll from "@/components/scroll";
import { scanDirectory, scanFile } from "@/lib/helpers";

export async function getStaticPaths() {
  let allPostPaths = await scanDirectory("src/posts/teaching/**/*.mdx");
  // filter out all index pages
  allPostPaths = allPostPaths.filter((post: string) => !post.includes("index"));

  const paths = allPostPaths.map((postPath: any) => {
    const splitCourse = postPath.split("/");
    const course = splitCourse.at(-2);
    const post = splitCourse.at(-1).split(".").at(0);
    return { params: { course, post: post } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { course, post } = context.params;
  const article = await scanFile(`src/posts/teaching/${course}/${post}.mdx`);
  const mdxSource = await serialize(article, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
      format: "mdx",
    },
    parseFrontmatter: true,
  });

  const parsed: any = {
    compiledSource: mdxSource.compiledSource,
    frontmatter: {
      ...mdxSource.frontmatter,
      readTime: readingTime(article.toString()).text,
    },
  };

  return {
    props: {
      source: parsed,
      course: course,
      post: post,
    },
  };
}

export default function Post({ source }: any) {
  const { frontmatter } = source;

  return (
    <>
      <Head>
        <title>{frontmatter.title} | Mika Senghaas</title>
        <meta name="description" content={`A post about ${frontmatter.title}`} />
        <meta property="og:title" content={`${frontmatter.title} | Mika Senghaas`} />
        <meta name="og:description" content={`A post about ${frontmatter.title}`} />
      </Head>
      <Scroll />
      <HeaderTitle title={frontmatter.title} />

      <Subpage>
        <Heading mb={5} fontSize="6xl" fontWeight={500}>
          {frontmatter.title}
        </Heading>
        <Text fontSize="md" variant="custom">
          {new Date(frontmatter.published).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          {" / "}
          {frontmatter.readTime}
        </Text>
        <Badge fontSize="xs" mb={10} mt={2} variant="custom">
          Last Updated {new Date(frontmatter.lastEdited).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </Badge>
        <MDXRemote {...source} />
      </Subpage>
    </>
  );
}

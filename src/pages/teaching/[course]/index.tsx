import Head from "next/head";
import { Box } from "@chakra-ui/react";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

import Subpage from "@/components/subpage";
import LinkBox from "@/components/link-box";

import { scanDirectory, scanFile } from "@/lib/helpers";
import readingTime from "reading-time";

export async function getStaticPaths() {
  const courses = await scanDirectory("src/posts/teaching/*");
  const paths = courses.map((course: string) => {
    return { params: { course: course.split("/").at(-1) } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  // serialise index source (/teaching/[course]/index.mdx)
  const courseSourceFile = await scanFile(`src/posts/teaching/${context.params.course}/index.mdx`);
  const courseSource = await serialize(courseSourceFile, { parseFrontmatter: true });

  // get all posts in that course
  let postPaths = await scanDirectory(`src/posts/teaching/${context.params.course}/*.mdx`);
  postPaths = postPaths.filter((post: string) => !post.includes("index"));
  const postFrontmatters = await Promise.all(
    postPaths.map(async (postPath: string) => {
      const post = postPath.split("/").at(-1);
      const source = await scanFile(`src/posts/teaching/${context.params.course}/${post}`);
      const frontmatter = await matter(source).data;

      const parsedFrontmatter: any = {
        ...frontmatter,
        readTime: readingTime(source.toString()).text,
      };

      return parsedFrontmatter;
    })
  );

  postFrontmatters.sort((a: any, b: any) => {
    const dateA = new Date(a.published);
    const dateB = new Date(b.published);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  return {
    props: {
      courseSource: courseSource,
      postFrontmatters: postFrontmatters,
    },
  };
}

export default function Course({ courseSource, postFrontmatters }: any) {
  const today = new Date();

  const allMeta = postFrontmatters.map((frontmatter: any) => ({
    ...frontmatter,
    recent: Math.abs(new Date(frontmatter.published).getTime() - today.getTime()) / (24 * 60 * 60 * 1000) < 7 ? 1 : 0,
  }));

  return (
    <>
      <Head>
        <title>{courseSource.frontmatter.title} | Mika Senghaas</title>
        <meta name="description" content={`${courseSource.frontmatter.summary} | Mika Senghaas`} />
        <meta property="og:title" content={`${courseSource.frontmatter.title} | Mika Senghaas`} />
        <meta name="og:description" content={`${courseSource.frontmatter.summary} | Mika Senghaas`} />
      </Head>
      <Subpage>
        <MDXRemote {...courseSource} />
        {allMeta.map((meta: any) => {
          return (
            <LinkBox
              orientation="horizontal"
              mb={2}
              meta={meta}
              href={`/teaching/${courseSource.frontmatter.id}/${meta.id}`}
              key={meta.id}
              height="70px"
            />
          );
        })}
      </Subpage>
    </>
  );
}

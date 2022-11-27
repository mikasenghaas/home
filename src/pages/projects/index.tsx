import Head from "next/head";

import { Grid, Box, Heading, Text } from "@chakra-ui/react";

import Subpage from "@/components/subpage";
import LinkBox from "@/components/link-box";

import { serialize } from "next-mdx-remote/serialize";
import { scanDirectory, scanFile } from "@/lib/helpers";

export async function getStaticProps() {
  const projectsPaths = await scanDirectory("src/posts/projects/*");
  const projectSources = await Promise.all(
    projectsPaths.map(async (projectPath: string) => {
      const project = projectPath.split("/").at(-1)?.split(".").at(0);
      const source = await scanFile(`src/posts/projects/${project}.mdx`);
      const serialized = await serialize(source, { parseFrontmatter: true });

      return serialized;
    })
  );
  // sort projects by publish date
  projectSources.sort((a: any, b: any) => {
    const dateA = new Date(a.frontmatter.published);
    const dateB = new Date(b.frontmatter.published);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  return {
    props: { projectSources },
  };
}

export default function Projects({ projectSources }: any) {
  return (
    <>
      <Head>
        <title>Projects | Mika Senghaas</title>
        <meta name="description" content="Data Science Student/ Teaching Asssistant @ ITU" />
        <meta property="og:title" content="Projects | Mika Senghaas" />
        <meta name="og:description" content="Data Science Student/ Teaching Asssistant @ ITU" />
      </Head>
      <Subpage>
        <Heading mb={10} fontSize="4xl">
          Projects
        </Heading>
        <Grid width="100%" templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }} gap={6}>
          {projectSources.map(({ frontmatter }: any) => {
            return <LinkBox orientation="vertical" meta={frontmatter} href={`/projects/${frontmatter.id}`} key={frontmatter.id} />;
          })}
        </Grid>
      </Subpage>
    </>
  );
}

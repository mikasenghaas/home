import Head from "next/head";

import { Grid, Box, Heading, Text } from "@chakra-ui/react";

import Subpage from "@/components/subpage";
import LinkBox from "@/components/link-box";

import { serialize } from "next-mdx-remote/serialize";
import { scanDirectory, scanFile } from "@/lib/helpers";

export async function getStaticProps() {
  const logPaths = await scanDirectory("src/posts/log/*");
  const logSources = await Promise.all(
    logPaths.map(async (logPath: string) => {
      const log = logPath.split("/").at(-1)?.split(".").at(0);
      const source = await scanFile(`src/posts/log/${log}.mdx`);
      const serialized = await serialize(source, { parseFrontmatter: true });

      return serialized;
    })
  );
  // sort projects by publish date
  logSources.sort((a: any, b: any) => {
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
    props: { logSources },
  };
}

export default function Projects({ logSources }: any) {
  return (
    <>
      <Head>
        <title>Log | Mika Senghaas</title>
        <meta name="description" content="Logging about content and ideas that resonate with me" />
        <meta property="og:title" content="Log | Mika Senghaas" />
        <meta name="og:description" content="Logging about content and ideas that resonate with me" />
        <meta property="og:image" content="/assets/social-preview.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary"></meta>
      </Head>
      <Subpage>
        <Heading mb={10} fontSize="4xl">
          Log
        </Heading>
        <Grid width="100%" templateColumns={{ base: "repeat(1, 1fr)" }} gap={6}>
          {logSources.map(({ frontmatter }: any) => {
            return <LinkBox orientation="horizontal" height="80px" meta={frontmatter} href={`/log/${frontmatter.id}`} key={frontmatter.id} />;
          })}
        </Grid>
      </Subpage>
    </>
  );
}

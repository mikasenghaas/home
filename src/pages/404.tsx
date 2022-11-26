import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";

import { Box, Heading, Text, Link, useColorModeValue } from "@chakra-ui/react";
import Subpage from "@/components/subpage";

export function NotFound() {
  const mode = useColorModeValue("light", "dark");

  return (
    <>
      <Head>
        <title>Not Found | Mika Senghaas</title>
        <meta name="description" content="Sorry, this page was not found. Try going back home." />
        <meta property="og:title" content="Not Found | Mika Senghaas" />
        <meta property="og:description" content="Sorry, this page was not found. Try going back home." />
        <meta property="og:image" content="/assets/social-preview.jpeg" />
        <meta name="twitter:card" content="summary"></meta>
      </Head>
      <Subpage>
        <Box position="relative" width="100%" height={{ base: "200px", lg: "300px" }}>
          <Image src={`/assets/void-${mode}.svg`} alt="void" fill style={{ objectFit: "contain" }} />
        </Box>
        <Heading textAlign="center" my={5}>
          I did not expect you here...
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Quick, go back{" "}
          <NextLink href="/" passHref legacyBehavior>
            <Link variant="custom">home</Link>
          </NextLink>
        </Text>
      </Subpage>
    </>
  );
}

export default NotFound;

import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";

import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";

import { Box, Flex, Tooltip, Badge, Button, Heading, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
  const mode = useColorModeValue("light", "dark");
  return (
    <>
      <Head>
        <title>Mika Senghaas</title>
        <meta name="description" content="Data Science Student/ Teaching Asssistant @ ITU" />
        <meta property="og:title" content="Mika Senghaas" />
        <meta property="og:description" content="Data Science Student/ Teaching Asssistant @ ITU" />
      </Head>

      <Box pt={{ base: 40, sm: 52, lg: 60 }}>
        <Image
          src={`/assets/mika-senghaas-${mode}.jpeg`}
          alt="profile-image"
          style={{ objectFit: "cover", borderRadius: "50px", marginTop: "40px", marginBottom: "40px" }}
          width={100}
          height={100}
          quality={50}
          priority
        />
        <Text
          color="light.text.secondary"
          _dark={{ color: "dark.text.secondary" }}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          fontWeight={600}
          lineHeight={1.5}
        >
          <strong>Hi 👋🏻 I&apos;m Mika.</strong> I am a student and teaching assistant at the{" "}
          <Link href="https://en.itu.dk/" variant="custom" isExternal>
            IT University of Copenhagen
          </Link>{" "}
          with a special interest in AI.
        </Text>
        <Flex my={10}>
          <Tooltip label="Check out my teaching material">
            <NextLink href="/teaching" scroll={false}>
              <Button variant="custom" rightIcon={<ArrowForwardIcon />}>
                Teaching
              </Button>
            </NextLink>
          </Tooltip>
          <Tooltip label="Check out recent projects">
            <NextLink href="/projects" scroll={false}>
              <Button variant="custom" rightIcon={<ArrowForwardIcon />}>
                Projects
              </Button>
            </NextLink>
          </Tooltip>
        </Flex>
        <Heading mt={40} mb={10} fontSize={{ base: "2xl", md: "4xl" }}>
          I am good at these things
        </Heading>
        <Flex my={3} direction={{ base: "column", sm: "row", md: "row" }} alignItems={{ base: "flex-start", sm: "center", md: "center" }}>
          <Box minWidth="200px">
            <Badge variant="custom">Languages</Badge>
          </Box>
          <Text variant="custom">Python, R, Java, C/C++, Javascript/ Typescript</Text>
        </Flex>

        <Flex my={3} direction={{ base: "column", sm: "row", md: "row" }} alignItems={{ base: "flex-start", sm: "center", md: "center" }}>
          <Box minWidth="200px">
            <Badge variant="custom">Data Science</Badge>
          </Box>
          <Text variant="custom">Statistics, ML/ DL, Network Analysis, Data Visualisation, Database Design</Text>
        </Flex>

        <Flex my={3} direction={{ base: "column", sm: "row", md: "row" }} alignItems={{ base: "flex-start", sm: "center", md: "center" }}>
          <Box minWidth="200px">
            <Badge variant="custom">Web/ Mobile Dev</Badge>
          </Box>
          <Text variant="custom">React (Native), Next, Flask, PostgreSQL, Netlify, Heroku, Vercel</Text>
        </Flex>

        <Flex my={3} direction={{ base: "column", sm: "row", md: "row" }} alignItems={{ base: "flex-start", sm: "center", md: "center" }}>
          <Box minWidth="200px">
            <Badge variant="custom">Collaboration</Badge>
          </Box>
          <Text variant="custom">Git, Jupyter Notebook, Google Colab, Deepnote</Text>
        </Flex>

        <Heading mt={40} mb={10} fontSize={{ base: "2xl", md: "4xl" }}>
          A few words about me
        </Heading>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          I am a 20-year old student from Germany studying my <strong>BSc. Data Science</strong> at ITU. During my studies I have developed a
          far-reaching interest into many domains of the CS and DS field. Today, I am especially intruiged by understanding SOTA research in
          artificial intelligence and algorithms for tackling the most complex problems to date. In spring 2023 I am writing my{" "}
          <strong>bachelor thesis</strong>, setting out to answer to what extend we can use computer vision for building a indoor positioning system.
        </Text>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          Apart from my studies, I am working as a teaching assistant at ITU, helping course managers to facilitate lectures and exercise sessions.
          You can see the list of courses, alongside material I put up for my students, at the{" "}
          <NextLink href="/teaching" passHref legacyBehavior scroll={false}>
            <Link variant="custom">teaching</Link>
          </NextLink>{" "}
          subpage.
        </Text>

        <Heading mt={40} mb={10} fontSize={{ base: "2xl", md: "4xl" }}>
          Let&apos;s talk!
        </Heading>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          I am always interested in exciting projects. Feel free to reach out to collaborate on general data science, machine learning, robotics,
          (mobile) app development and whatever else you think I could be useful with.
        </Text>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          You can reach me via{" "}
          <Link variant="custom" href="mailto:contact@jonas-mika.de" isExternal>
            mail
          </Link>{" "}
          or on any social{" "}
          <Link variant="custom" href="">
            @mikasenghaas
          </Link>{" "}
        </Text>
        <Flex mt={10} mb={{ base: 20, lg: 40 }} justifyContent="space-between" alignItems="center">
          <Tooltip label="GitHub">
            <Button as={Link} borderRadius="xl" width={100} height={100} variant="custom" href="https://www.github.com/mikasenghaas" isExternal>
              <AiOutlineGithub size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="LinkedIn">
            <Button as={Link} borderRadius="xl" width={100} height={100} variant="custom" href="https://www.linkedin.com/in/mikasenghaas" isExternal>
              <AiOutlineLinkedin size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Twitter">
            <Button as={Link} borderRadius="xl" width={100} height={100} variant="custom" href="https://www.twitter.com/mikasenghaas" isExternal>
              <AiOutlineTwitter size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Facebook">
            <Button as={Link} borderRadius="xl" width={100} height={100} variant="custom" href="https://www.facebook.com/mikasenghaas" isExternal>
              <AiOutlineFacebook size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Instagram">
            <Button as={Link} borderRadius="xl" width={100} height={100} variant="custom" href="https://www.instagram.com/mikasenghaas" isExternal>
              <AiOutlineInstagram size={50} />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
}

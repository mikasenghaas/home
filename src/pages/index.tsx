import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";

import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";

import {
  Box,
  Flex,
  Tooltip,
  Badge,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
  const mode = useColorModeValue("light", "dark");
  return (
    <>
      <Head>
        <title>Mika Senghaas</title>
        <meta
          name="description"
          content="Data Science Student/ Teaching Asssistant @ ITU"
        />
        <meta property="og:title" content="Mika Senghaas" />
        <meta
          property="og:description"
          content="Data Science Student/ Teaching Asssistant @ ITU"
        />
      </Head>

      <Box pt={{ base: 40, sm: 52, lg: 60 }}>
        <Image
          src={`/assets/mika-senghaas-${mode}.jpeg`}
          alt="profile-image"
          style={{
            objectFit: "cover",
            borderRadius: "50px",
            marginTop: "40px",
            marginBottom: "40px",
          }}
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
          <strong>Hi 👋🏻 I&apos;m Mika.</strong> I am a student and teaching
          assistant at the{" "}
          <Link href="https://en.itu.dk/" variant="custom" isExternal>
            IT University of Copenhagen
          </Link>{" "}
          interested in cutting-edge AI.
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
        <Flex
          my={3}
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="200px">
            <Badge variant="custom">Languages</Badge>
          </Box>
          <Text variant="custom">
            Python, R, Java, C/C++, Javascript/ Typescript
          </Text>
        </Flex>

        <Flex
          my={3}
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="200px">
            <Badge variant="custom">Data Science</Badge>
          </Box>
          <Text variant="custom">
            Statistical Learning, Machine Intelligence, Network Analysis, Data
            Visualisation
          </Text>
        </Flex>

        <Flex
          my={3}
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="200px">
            <Badge variant="custom">Software Engineering</Badge>
          </Box>
          <Text variant="custom">
            Algorithms/ Data Structures, Operating Systems, Software Design, OOP
          </Text>
        </Flex>

        <Flex
          my={3}
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="200px">
            <Badge variant="custom">Techstack</Badge>
          </Box>
          <Text variant="custom">
            Git, Numpy, Pytorch, Sci-Kit Learn, Pandas, Matplotlib, Tableau,
            React (Native), Next.js, Astro, Flask, PostgreSQL, Heroku, Netlify,
            Vercel
          </Text>
        </Flex>

        <Heading mt={40} mb={10} fontSize={{ base: "2xl", md: "4xl" }}>
          A few words about me
        </Heading>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          I am a 21-year old student from Germany studying my{" "}
          <strong>BSc. Data Science</strong> at ITU. Artificial intelligence is
          my primary passion within the data science field. I am deeply
          fascinated by the theory and application of machines that learn and am
          convinced that it is going to shape our future in ways we cannot
          imagine yet. In pursuit of learning within this field, I am writing my{" "}
          <strong>bachelor thesis</strong> in computer vision this spring. I am
          the founder of the artificial intelligence student organisation{" "}
          <Link href="https://aitu.group/" variant="custom" isExternal>
            AITU
          </Link>
          , where we create a community around the field of AI. Moreover, I
          organise the event{" "}
          <Link href="https://coffeetalks.itu.dk" variant="custom" isExternal>
            CS Coffee Talks
          </Link>{" "}
          and represent my university as a student ambassador.
        </Text>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          Apart from my studies, I work as a teaching assistant at ITU, helping
          course managers to facilitate lectures and exercise sessions. You can
          see the list of courses, alongside material I put up for my students,
          at the{" "}
          <NextLink href="/teaching" passHref legacyBehavior scroll={false}>
            <Link variant="custom">teaching</Link>
          </NextLink>{" "}
          subpage.
        </Text>

        <Heading mt={40} mb={10} fontSize={{ base: "2xl", md: "4xl" }}>
          Let&apos;s talk!
        </Heading>
        <Text variant="custom" fontSize={{ base: "lg", sm: "xl" }} mb={2}>
          I am always interested in exciting projects. Feel free to reach out to
          collaborate on general data science, machine learning, robotics,
          (mobile) app development and whatever else you think I could be useful
          with.
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
        <Flex
          mt={10}
          mb={{ base: 20, lg: 40 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Tooltip label="GitHub">
            <Button
              as={Link}
              borderRadius="xl"
              width={100}
              height={100}
              variant="custom"
              href="https://www.github.com/mikasenghaas"
              isExternal
            >
              <AiOutlineGithub size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="LinkedIn">
            <Button
              as={Link}
              borderRadius="xl"
              width={100}
              height={100}
              variant="custom"
              href="https://www.linkedin.com/in/mikasenghaas"
              isExternal
            >
              <AiOutlineLinkedin size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Twitter">
            <Button
              as={Link}
              borderRadius="xl"
              width={100}
              height={100}
              variant="custom"
              href="https://www.twitter.com/mikasenghaas"
              isExternal
            >
              <AiOutlineTwitter size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Facebook">
            <Button
              as={Link}
              borderRadius="xl"
              width={100}
              height={100}
              variant="custom"
              href="https://www.facebook.com/mikasenghaas"
              isExternal
            >
              <AiOutlineFacebook size={50} />
            </Button>
          </Tooltip>
          <Tooltip label="Instagram">
            <Button
              as={Link}
              borderRadius="xl"
              width={100}
              height={100}
              variant="custom"
              href="https://www.instagram.com/mikasenghaas"
              isExternal
            >
              <AiOutlineInstagram size={50} />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
}

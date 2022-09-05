// About.tsx
// By: Mika Senghaas

import { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  UnorderedList,
  ListItem,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

// custom styles
import * as md from "../styles/MarkdownStyles";
import { capitalise } from "../lib/helpers";

// custom hooks
import useWindowDimensions from "../hooks/useWindowSize";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";

// analytics
import ReactGA from "react-ga4";

const About = () => {
  ReactGA.send({ hitType: "pageview", page: "/about" });
  const { width } = useWindowDimensions();

  useEffect(() => {
    document.title = "About - Mika Senghaas";
  }, []);

  const trackEvent = (category: string, action: string, label: string) => {
    ReactGA.send({
      category: category,
      action: action,
      label: label,
    });
  };

  return (
    <PageBox>
      <TraceBack />
      <Flex>
        <Box flexGrow={1}>
          <md.H1>Mika Senghaas</md.H1>
          <md.Divider />
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src={`/images/mika-senghaas-${useColorModeValue(
                "light",
                "dark"
              )}.jpeg`}
              alt="profile-image"
              borderRadius="full"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Flex>
      <md.P>
        My name is Mika. I am a 20-year old student from Germany who is
        currently studying Data Science at the{" "}
        <md.Link url="https://en.itu.dk/" isExternal>
          IT University of Copenhagen
        </md.Link>
        . Since August 2021, I am working as a Teaching Assistant, where I help
        the course managers with preparing exercise material, running exercise
        classes, grading assignments and assisting students individually. The
        courses I have taught so far are:
      </md.P>
      <UnorderedList spacing={1} my=".5rem">
        <ListItem>
          <md.Link to="/teaching/ml">Machine Learning</md.Link>
        </ListItem>
        <ListItem>
          <md.Link to="/teaching/lao">Linear Algebra and Optimisation</md.Link>
        </ListItem>
        <ListItem>
          <md.Link to="/teaching/stats">Applied Statistics</md.Link>
        </ListItem>
        <ListItem>
          <md.Link to="/teaching/algs">Algorithms and Data Structures</md.Link>
        </ListItem>
        <ListItem>
          <md.Inline>Introduction to Data Science and Programming</md.Inline>
        </ListItem>
      </UnorderedList>
      <md.H3>Helpsome</md.H3>
      <md.P>
        Besides my studies, I am working as a student data scientist at{" "}
        <md.Link url="https://www.helpsome.com" isExternal>
          Helpsome
        </md.Link>{" "}
        - first in part-time and since September 2022 as an external consultant.
        At Helpsome, I am handling all data science related jobs in the company.
        These range from statistical analysis and modelling of psychometric data
        (e.g. imputing the O.C.E.A.N model using a custom{" "}
        <md.InlineCode>PyTorch</md.InlineCode> neural network), making
        dashboards and developing the recommendation engine of the app.
      </md.P>
      <md.H3>Freelancing</md.H3>
      <md.P>
        I am always interested in exciting projects that fit my skill set. Feel
        free to reach out to collaborate on data science (especially deep
        learning related) or web-/ app development projects
      </md.P>
      <md.Divider />
      <md.P>
        You can reach me via{" "}
        <md.Link
          onClick={() => trackEvent("Social Link", "E-Mail", "Button")}
          url="mailto:contact@jonas-mika.de"
        >
          mail
        </md.Link>{" "}
        or any of the below socials.
      </md.P>
      <Flex
        my="1rem"
        direction={width < 600 ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          m="5px"
          width={width < 600 ? "100%" : "default"}
          borderRadius={0}
          colorScheme="linkedin"
          variant="outline"
          leftIcon={<FaLinkedin />}
          onClick={() => trackEvent("Social Link", "LinkedIn", "Button")}
        >
          <Link
            href="https://www.linkedin.com/in/jonas-mika-senghaas"
            isExternal
          >
            LinkedIn
          </Link>
        </Button>
        <Button
          m="5px"
          width={width < 600 ? "100%" : "default"}
          borderRadius={0}
          colorScheme="twitter"
          variant="outline"
          leftIcon={<FaFacebook />}
          onClick={() => trackEvent("Social Link", "Facebook", "Button")}
        >
          <Link href="https://www.facebook.com/jonasmika.senghaas" isExternal>
            Facebook
          </Link>
        </Button>
        <Button
          m="5px"
          width={width < 600 ? "100%" : "default"}
          borderRadius={0}
          colorScheme="red"
          variant="outline"
          leftIcon={<FaInstagram />}
          onClick={() => trackEvent("Social Link", "Instagram", "Button")}
        >
          <Link href="https://instagram.com/mikasenghaas" isExternal>
            Instagram
          </Link>
        </Button>
        <Button
          m="5px"
          width={width < 600 ? "100%" : "default"}
          borderRadius={0}
          colorScheme="purple"
          variant="outline"
          leftIcon={<FaGithub />}
          onClick={() => trackEvent("Social Link", "GitHub", "Button")}
        >
          <Link href="https://github.com/jonas-mika" isExternal>
            GitHub
          </Link>
        </Button>
      </Flex>
    </PageBox>
  );
};

export default About;

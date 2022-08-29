// About.tsx
// By: Mika Senghaas

import { useEffect } from 'react'
import {
  Box,
  Flex,
  Link,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom hooks
import useWindowDimensions from "../hooks/useWindowSize";

// custom components
import PageBox from '../components/PageBox'
import TraceBack from '../components/TraceBack'


const About = () => {
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    document.title = 'about@jonas-mika'
  }, [])


  return (
    <PageBox>
      <TraceBack />
      <md.H1 mt='1.5rem'>About</md.H1>
      <md.Divider />
      <md.P mt="20px">
        <md.InlineCode>Hej</md.InlineCode>!
      </md.P>
      <md.P>
        My name is Mika. I am a 20-year old student from Germany who is
        currently studying Data Science at the{" "}
        <md.Link url="https://en.itu.dk/" isExternal>
          IT University of Copenhagen
        </md.Link>
        . Since August 2021, i working as a teaching assistant in , where i
        amongst other aid the professor with preparing exercise material,
        running exercise classes, grading assignments and assisting students
        individually. The courses I have taught so far are:
      </md.P>
      <UnorderedList spacing={1} my=".5rem">
        <ListItem>
          <md.Inline>machine learning</md.Inline>
        </ListItem>
        <ListItem>
          <md.Inline>linear algebra and optimisation</md.Inline>
        </ListItem>
        <ListItem>
          <md.Inline>applied statistics</md.Inline>
        </ListItem>
        <ListItem>
          <md.Inline>algorithms and data structures</md.Inline>
        </ListItem>
        <ListItem>
          <md.Inline>introduction to data science and programming</md.Inline>
        </ListItem>
      </UnorderedList>
      This webpage hosts assisting material for exercise classes, that many of
      my students use during the semester to assist their learning.
      <md.H3>Helpsome</md.H3>
      <md.P>
        Besides my studies, I am working as a student data scientist at{" "}
        <md.Link url="https://www.helpsome.com" isExternal>
          Helpsome
        </md.Link>{" "}
        - first in part-time and since september 2022 as an external consultant.
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
        <md.Link url="mailto:contact@jonas-mika.de">mail</md.Link> or any of the
        below socials.
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
        >
          <Link
            href="https://www.facebook.com/jonasmika.senghaas"
            isExternal
          >
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

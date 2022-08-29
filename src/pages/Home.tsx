// Home.tsx
// By: Mika Senghaas

import { Flex, Box, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import Markdown from 'markdown-to-jsx'

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";
import CourseBox from "../components/CourseBox";
import ProjectBox from "../components/ProjectBox";

const Home = (props: any) => {
  const { courses, projects, loadingCourses, admin } = props.state;

  return (
    <PageBox>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
        css={{ backdropFilter: "blur(10px)" }}
      >
        Hej, I&apos;m Mika.
      </Box>
      <Flex>
        <Box flexGrow={1}>
          <md.H1>Mika Senghaas</md.H1>
          <md.Divider />
          <Markdown>*Learning* Data Scientist / Fullstack Developer</Markdown>
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
              src={`/images/mika-senghaas-${useColorModeValue('light', 'dark')}.jpeg`}
              alt="profile-image"
              borderRadius="full"
              objectFit='cover'
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Flex>
      <md.H2 mt={10}>Stack</md.H2>
      <md.Divider />
      <Flex
        my={3}
        direction={{ base: "column", sm: "row", md: "row" }}
        alignItems={{ base: "flex-start", sm: "center", md: "center" }}
      >
        <Box minWidth="200px">
          <md.Badge>Languages</md.Badge>
        </Box>
        <md.P>Python, R, Javascript, C/ C++</md.P>
      </Flex>

      <Flex
        my={3}
        direction={{ base: "column", sm: "row", md: "row" }}
        alignItems={{ base: "flex-start", sm: "center", md: "center" }}
      >
        <Box minWidth="200px">
          <md.Badge>Data Science</md.Badge>
        </Box>
        <md.P>
          Statistics, Machine Learning/ Deep Learning, Network Analysis, Data
          Visualisation, Database Design
        </md.P>
      </Flex>

      <Flex
        my={3}
        direction={{ base: "column", sm: "row", md: "row" }}
        alignItems={{ base: "flex-start", sm: "center", md: "center" }}
      >
        <Box minWidth="200px">
          <md.Badge>Fullstack Development</md.Badge>
        </Box>
        <md.P>React, React Native, Flask, PostgreSQL, Netlify/ Heroku</md.P>
      </Flex>

      <Flex
        my={3}
        direction={{ base: "column", sm: "row", md: "row" }}
        alignItems={{ base: "flex-start", sm: "center", md: "center" }}
      >
        <Box minWidth="200px">
          <md.Badge>Collaboration</md.Badge>
        </Box>
        <md.P>Git, Jupyter Notebook, Google Colab, Deepnote, Overleaf</md.P>
      </Flex>

      <md.H2 mt={10}>About</md.H2>
      <md.Divider />
      <md.P>
        Mika Senghaas is a 20-year old student from Germany who is currently
        studying Data Science at the{" "}
        <md.Link url="https://en.itu.dk" isExternal>
          IT University of Copenhagen
        </md.Link>
        . His main occupation - besides his studies - is working as a Teaching
        Assistant (TA). He has taught 5 different courses, teaching a total of{" "}
        {">"}500 students, in the span of one year. Besides, he is open to
        freelance work - ranging from private tutoring to software development
        and data science projects.
      </md.P>
      <md.Link to="/about">Learn more</md.Link>

      <md.H2 mt={10}>Current Courses</md.H2>
      <md.Divider />
      <md.P mb={5}>
        I am uploading notes on lectures and solutions to exercises to the
        courses I teach. These are the two courses I am current teaching.
      </md.P>
      {!loadingCourses &&
        courses.map((course: any, i: number) => {
          return (
            <CourseBox
              key={i}
              course={course}
              setState={props.setState}
              admin={admin}
            />
          );
        })}

      <md.H2 mt={10}>Recent Projects</md.H2>
      <md.Divider />
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
        gap={6}
      >
        {projects.map((project: any, i: number) => {
          return <ProjectBox key={i} project={project} />;
        })}
      </Grid>
    </PageBox>
  );
};

export default Home;

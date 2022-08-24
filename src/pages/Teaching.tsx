// Teaching.tsx
// By: Mika Senghaas
import { Box, Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import { Outlet, Link as RouterLink } from "react-router-dom";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom componenents
import PageBox from '../components/PageBox'

const CourseBox = (props: any) => {
  const { course } = props;
  return (
    <RouterLink
      to={course.short_name}
      style={{ textDecoration: "none" }}
      role="group"
    >
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        p="5px"
        _groupHover={{ backgroundColor: "var(--markdown-code-bg)" }}
      >
        <md.P p={0} mx="5px">
          📙
        </md.P>
        <md.Link>{course.name}</md.Link>
      </Flex>
    </RouterLink>
  );
};

const Teaching = (props: any) => {
  const { courses, loadingCourses } = props.state;

  return (
    <PageBox>
      <md.H1 mt="1.5rem">Teaching</md.H1>
      <md.Divider />
      <md.P>
        This page is meant for my students from{" "}
        <md.Link url="https://en.itu.dk" isExternal>
          ITU
        </md.Link>
        . Prior to exercise classes, I upload lecture notes and exercise
        material.
      </md.P>
      <md.P>
        Most content is processed material from my course notes, therefore I do
        not guarantee correctness of all contents. That said, I do believe all
        material to be useful for verifying the own learning while taking the
        course. I *do not* recommend only using these notes. The content here
        should merely assist your learning.
      </md.P>
      <md.H2 mt='2.5rem'>
        Courses
      </md.H2>
      <md.Divider />
      {!loadingCourses &&
        courses.map((course: any, i: number) => {
          return <CourseBox key={i} course={course} />;
        })}
      <Outlet />
    </PageBox>
  );
};

export default Teaching;

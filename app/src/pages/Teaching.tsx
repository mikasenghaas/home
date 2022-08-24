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
    <ListItem>
      <RouterLink to={course.short}>
        <Flex>
          <md.Link>{course.name}</md.Link>
        </Flex>
      </RouterLink>
    </ListItem>
  );
};

const Teaching = (props: any) => {
  const { courses } = props.state;

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

      <UnorderedList>
        {courses.map((course: any, i: number) => {
          return <CourseBox key={i} course={course} />;
        })}
      </UnorderedList>
      <Outlet />
    </PageBox>
  );
};

export default Teaching;

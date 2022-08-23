// Course.tsx
// By: Mika Senghaas

import { Flex, Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import * as md from "../styles/MarkdownStyles";

const MaterialBox = (props: any) => {
  const { material } = props;
  return (
    <ListItem>
      <RouterLink to={material.name}>
        <Flex>
          <md.Link>{material.name}</md.Link>
       </Flex>
      </RouterLink>
    </ListItem>
  );
};

const Course = (props: any) => {
  const { course_short } = useParams();
  const { courses } = props.state;

  const course = courses.find((c: any) => c.short === course_short);

  return (
    <Box zIndex={50}>
      <md.Accent>{`teaching >`}</md.Accent>
      <md.H1>{course.name}</md.H1>
      <md.Divider />
      <Flex>
        {course.tags.map((tag: any, i: number) => {
          return <md.Badge mr="10px">{tag}</md.Badge>;
        })}
      </Flex>
      <md.P mt="1rem">
        Welcome to <md.InlineCode>Machine Learning</md.InlineCode> fall 2022.
      </md.P>
      <md.P>
        On this page, I will publish (slightly processed) lecture notes from
        when I took this course in fall 2021.
      </md.P>
      <md.H3>
        Material
      </md.H3>
      <UnorderedList>
      {
        course.materials.map((material: any, i: number) => {
          return (
            <MaterialBox key={i} material={material} />
          )
        })
      }
      </UnorderedList>
    </Box>
  );
};

export default Course;

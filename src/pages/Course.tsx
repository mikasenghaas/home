// Course.tsx
// By: Mika Senghaas

import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";

const MaterialBox = (props: any) => {
  const { material } = props;
  return (
    <RouterLink
      to={material.short_title}
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
          🖇
        </md.P>
        <md.P color='var(--markdown-link)' _hover={{ textDecoration: 'underline' }}>{material.title}</md.P>
      </Flex>
    </RouterLink>
  );
};

const Course = (props: any) => {
  const { course_short } = useParams();
  const { courses, material, loadingMaterial } = props.state;
  const [course, setCourse] = useState({ name: "", id: "" });
  const [courseMaterial, setCourseMaterial] = useState([]);

  useEffect(() => {
    if (!loadingMaterial) {
      const c = courses.find((c: any) => c.short_name === course_short);
      setCourse(c);
    }
  }, [props.state])

  useEffect(() => {
    if (material && course.name) {
      console.log(material, course)
      const cm = material.filter((m: any) => m.cid === course.id);
      setCourseMaterial(cm);
    }
  }, [course])

  return (
    <PageBox>
      <TraceBack />
      {!loadingMaterial && (
        <>
          <md.H1>{course.name}</md.H1>
          <md.Divider />
          <md.P>
            On this page, I will publish (slightly processed) lecture notes from
            when I took this course in fall 2021.
          </md.P>
          <md.H2 mt="2.5rem">Material</md.H2>
          <md.Divider />
          {courseMaterial.map((material: any, i: number) => {
            return <MaterialBox key={i} material={material} />;
          })}
        </>
      )}
    </PageBox>
  );
};

export default Course

// Project.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, AspectRatio, Image } from "@chakra-ui/react";

// custom pages
import Unauthorised from "../pages/Unauthorised";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";

import * as md from "../styles/MarkdownStyles";

const Project = (props: any) => {
  useEffect(() => {
    document.title = "projects@jonas-mika";
  }, []);
  const { project_short } = useParams();
  const { projects } = props.state;
  const [project, setProject] = useState({
    name: "",
    short_name: "",
    desc: "",
    date: new Date(),
    topic: "",
    stack: [],
    link: "",
    images: [],
  });

  useEffect(() => {
    document.title = "projects@jonas-mika";
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const curr_project = projects.find(
      (p: any) => p.short_name === project_short
    );

    if (curr_project) {
      setProject(curr_project);
    }
  }, []);

  if (!project) {
    return <Unauthorised />;
  } else {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height="50px">
          <TraceBack />
        </Flex>
        <md.H1>{project.name}</md.H1>
        <md.Divider />
        <Flex alignItems="center">
          <md.Badge>{project.topic}</md.Badge>
          <md.Badge>{project.date.getFullYear()}</md.Badge>
        </Flex>
        <md.P my={5}>{project.desc}</md.P>
        <Flex
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="100px">
            <md.Badge>Stack</md.Badge>
          </Box>
          <md.P>{project.stack}</md.P>
        </Flex>
        <Flex
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center", md: "center" }}
        >
          <Box minWidth="100px">
            <md.Badge>Link</md.Badge>
          </Box>
          <md.Link url={project.link} width="100%" overflow="hidden" isExternal>
            <md.P noOfLines={1}>{project.link}</md.P>
          </md.Link>
        </Flex>
        {project.images.map((img: "string", i: number) => {
          console.log(img);
          return (
            <AspectRatio mt="1rem" key={i} ratio={16 / 9}>
              <Image
                src={img}
                alt={img}
                width="100%"
                borderRadius="10px"
                my={5}
              />
            </AspectRatio>
          );
        })}
      </PageBox>
    );
  }
};

export default Project;

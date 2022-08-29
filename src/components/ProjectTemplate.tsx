// Project.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, AspectRatio, Image } from "@chakra-ui/react";

// custom pages
import NotFound from "../pages/NotFound";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle";

import * as md from "../styles/MarkdownStyles";

const ProjectTemplate = (props: any) => {
  const { project } = props;

  if (!project.name) {
    return <NotFound />;
  } else {
    return (
      <>
        <md.H1>{project.name}</md.H1>
        <md.Divider />
        <Flex alignItems="center">
          <md.Badge>{project.topic}</md.Badge>
          <md.Badge>{project.year}</md.Badge>
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
        {JSON.parse(project.images).map((img: "string", i: number) => {
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
      </>
    );
  }
};

export default ProjectTemplate;

// Project.tsx
// By: Mika Senghaas
import { Box, Flex, AspectRatio, Image } from "@chakra-ui/react";

// custom pages
import NotFound from "../pages/NotFound";

// custom styles
import Markdown from "../components/Markdown"
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
        <Flex my={2} alignItems="center">
          <md.Badge>{project.topic}</md.Badge>
          <md.Badge>{project.year}</md.Badge>
        </Flex>
        <Markdown>{project.desc}</Markdown>
        <Flex mt={5}
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

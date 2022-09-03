import { Box, Flex, AspectRatio, Link, Image } from "@chakra-ui/react";
import * as md from "../styles/MarkdownStyles";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

const ProjectBox = (props: any) => {
  const { project, grayscale, isDisabled } = props;

  return (
    <Link
      pointerEvents={isDisabled ? "none" : "all"}
      as={RouterLink}
      to={`/projects/${project.short_name}`}
      _hover={{ textDecoration: "none" }}
      role="group"
    >
      <Box>
        <AspectRatio ratio={4 / 3}>
          <Box borderRadius="15px">
            <MotionImage
              src={JSON.parse(project.images)[0]}
              alt={project.name}
              objectFit="cover"
              width="100%"
              height="100%"
              whileHover={{ cursor: "pointer", scale: 1.05 }}
              filter={grayscale && "grayscale(100%)"}
            />
          </Box>
        </AspectRatio>
        <md.H3
          mt={5}
          textAlign="center"
          _groupHover={{ textDecoration: "underline" }}
        >
          {project.name}
        </md.H3>
        <Flex alignItems="center" justifyContent="center">
          <md.Badge>{project.topic}</md.Badge>
          <md.Badge>{project.year}</md.Badge>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProjectBox;

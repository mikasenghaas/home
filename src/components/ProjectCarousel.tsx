// Carousel.tsx
// By: Mika Senghaas

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// custom components
import ProjectBox from "./ProjectBox";

const ProjectCarousel = (props: any) => {
  const { projects } = props;

  let navigate = useNavigate();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const [current, setCurrent] = useState(0);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCurrent(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <Box ref={emblaRef} overflow="hidden" my={5}>
        <Box display="flex">
          {projects.map((project: Object, index: number) => {
            return (
              <Box
                key={index}
                mx="10px"
                flex="0 0 70%"
                onClick={() => scrollTo(index)}
              >
                <ProjectBox
                  project={project}
                  grayscale={current === index ? false : true}
                  isDisabled={current === index ? false : true}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Flex justifyContent="center" alignItems="center">
        {projects.map((_: any, index: number) => {
          return (
            <Box
              key={index}
              h={current === index ? "6px" : "3px"}
              w="30px"
              mx={1}
              my={5}
              borderRadius="full"
              bgColor={
                current === index
                  ? "var(--markdown-accent)"
                  : "var(--markdown-text)"
              }
              _hover={{ cursor: "pointer" }}
              onClick={() => scrollTo(index)}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default ProjectCarousel;

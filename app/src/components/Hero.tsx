// Hero.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/react";

// components
import ThreeScene from "./ThreeScene";

const Hero = () => {
  return (
    <AspectRatio
      ratio={1}
      maxWidth="600px"
      mt={["-20px", "-20px", "-20px"]}
      mb={["-40px", "-140px", "-200px"]}
      position="relative"
    >
      <ThreeScene />
    </AspectRatio>
  );
};

export default Hero;

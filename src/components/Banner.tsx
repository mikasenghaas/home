// Banner.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";

const Banner = (props: any) => {
  return (
    <Box
      position="relative"
      width="100vw"
      marginLeft="-50vw"
      left="50%"
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default Banner;

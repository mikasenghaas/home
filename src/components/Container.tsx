// Container.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";

const Container = (props: any) => {
  return (
    <Box mx="auto" px="30px" maxWidth="600px" {...props}>
      {props.children}
    </Box>
  );
};

export default Container;

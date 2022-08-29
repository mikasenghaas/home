// Loading.tsx
// By: Mika Senghaas

import { Flex, Spinner } from "@chakra-ui/react";
import * as md from "../styles/MarkdownStyles";

const Loading = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt="auto"
    >
      <Spinner size="xl" />
      <md.P mt="1rem">Loading</md.P>
    </Flex>
  );
};

export default Loading;

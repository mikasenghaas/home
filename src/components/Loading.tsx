// Loading.tsx
// By: Mika Senghaas

import { Flex, Spinner } from "@chakra-ui/react";
import * as md from "../styles/MarkdownStyles";

const Loading = ({ size = "xl", ...props }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt="auto"
      {...props}
    >
      <Spinner size={size} />
      <md.P fontSize={size} mt="1rem">
        Loading
      </md.P>
    </Flex>
  );
};

export default Loading;

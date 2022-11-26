import NextLink from "next/link";
import { Tooltip, Heading, Link } from "@chakra-ui/react";

function Mika() {
  return (
    <Tooltip label="Home">
      <NextLink href="/">
        <Heading variant="primary" fontSize="5xl" fontWeight={800}>
          m
        </Heading>
      </NextLink>
    </Tooltip>
  );
}

export default Mika;

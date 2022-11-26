import React from "react";
import { Box } from "@chakra-ui/react";

import Breadcrumb from "@/components/breadcrumb";

export default function Subpage({ children, ...props }: any) {
  return (
    <Box top={0} left={0} right={0} {...props}>
      <Box mx="auto" pt={60} maxWidth="700px">
        <Breadcrumb mb={5} />
        {children}
      </Box>
    </Box>
  );
}

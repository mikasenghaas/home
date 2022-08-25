// MaterialBox.tsx
// By: Mika Senghaas

import { Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

// custom styles
import * as md from '../styles/MarkdownStyles';

const MaterialBox = (props: any) => {
  const { material } = props;
  return (
    <RouterLink
      to={material.short_title}
      style={{ textDecoration: "none" }}
      role="group"
      {...props}
    >
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        p="5px"
        _groupHover={{ backgroundColor: "var(--markdown-code-bg)" }}
      >
        <md.P p={0} mx="5px">
          🖇
        </md.P>
        <md.P color='var(--markdown-link)' _hover={{ textDecoration: 'underline' }}>{material.title}</md.P>
      </Flex>
    </RouterLink>
  );
};

export default MaterialBox;

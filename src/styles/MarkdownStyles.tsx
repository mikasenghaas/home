// MarkdownStyles.tsx
// By: Mika Senghaas

import {
  Box,
  Heading,
  Text,
  Code,
  Link as ChakraLink,
  Badge as ChakraBadge,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import EmojiDict from "../lib/emojis";
var Latex = require("react-latex");

export const H1 = (props: any) => {
  return (
    <Heading
      size="2xl"
      {...props}
    >
      {props.children}
    </Heading>
  );
};

export const H2 = (props: any) => {
  return (
    <Heading
      mt={15}
      size="xl"
      {...props}
    >
      {props.children}
    </Heading>
  );
};

export const H3 = (props: any) => {
  return (
    <Heading mt={10} size="l" color="var(--markdown-text)" {...props}>
      {props.children}
    </Heading>
  );
};

export const H4 = (props: any) => {
  return (
    <Heading size="xs" color="var(--markdown-text)" {...props}>
      {props.children}
    </Heading>
  );
};

export const P = (props: any) => {
  return (
    <Text color="var(--markdown-text)" my={1.5} {...props}>
      {props.children}
    </Text>
  );
};

export const Accent = (props: any) => {
  return (
    <Text fontWeight="bold" color="var(--markdown-accent)" {...props}>
      {props.children}
    </Text>
  );
};

export const Inline = (props: any) => {
  return (
    <Text color="var(--markdown-text)" {...props}>
      {props.children}
    </Text>
  );
};

export const Badge = (props: any) => {
  return (
    <ChakraBadge
      bgColor="var(--markdown-code-bg)"
      color="var(--markdown-accent)"
      m={0.5}
      {...props}
    >
      {props.children}
    </ChakraBadge>
  );
};

export const Link = (props: any) => {
  if (props.to) {
    return (
      <ChakraLink
        as={RouterLink}
        to={props.to}
        color="var(--markdown-link)"
        {...props}
      >
        {props.children}
      </ChakraLink>
    );
  } else {
    return (
      <ChakraLink href={props.url} color="var(--markdown-link)" {...props}>
          {props.children}
      </ChakraLink>
    );
  }
};

export const InlineCode = (props: any) => {
  return (
    <code
      style={{
        fontSize: 14,
        color: "var(--markdown-accent)",
        padding: 2,
        backgroundColor: "var(--markdown-code-bg)",
        borderRadius: 5,
      }}
    >
      {props.children}
    </code>
  );
};

export const CodeBlock = (props: any) => {
  return (
    <Code
      style={{
        fontSize: 14,
        color: "var(--markdown-text)",
        padding: 5,
        backgroundColor: "var(--markdown-code-bg)",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        whiteSpace: "pre-wrap",
      }}
    >
      {props.children}
    </Code>
  );
};

export const InlineMath = (props: any) => {
  console.log(props.children);
  return (
    <P>
      <Latex fontSize="10px">{props.children[0]}</Latex>
    </P>
  );
};

export const MathBlock = (props: any) => {
  console.log(props.children);
  return (
    <P fontSize="1.1em">
      <Latex displayMode={true}>{props.children[0]}</Latex>
    </P>
  );
};

interface DividerProps {
  marginBottom?: number;
  height?: number;
  lineType?: string;
}
export const Divider = ({ marginBottom=10, height = 1.5, lineType = "solid" }: DividerProps) => {
  return (
    <hr
      style={{
        marginBottom: marginBottom,
        borderTop: `${height}px ${lineType} var(--markdown-text-inverse)`,
      }}
    ></hr>
  );
};

export const Emoji = (props: any) => {
  return (
    <span
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {EmojiDict[props.children]}
    </span>
  );
};

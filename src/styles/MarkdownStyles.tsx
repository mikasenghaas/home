// MarkdownStyles.tsx
// By: Mika Senghaas

import {
  Heading,
  Text,
  Code,
  Link as ChakraLink,
  Badge as ChakraBadge,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import EmojiDict from "../lib/emojis";

export const H1 = (props: any) => {
  return (
    <Heading my={2} size="xl" {...props}>
      {props.children}
    </Heading>
  );
};

export const H2 = (props: any) => {
  return (
    <Heading mt={10} mb={2} size="lg" {...props}>
      {props.children}
    </Heading>
  );
};

export const H3 = (props: any) => {
  return (
    <Heading mt={10} mb={2} size="md" color="var(--markdown-text)" {...props}>
      {props.children}
    </Heading>
  );
};

export const H4 = (props: any) => {
  return (
    <Heading size="sm" color="var(--markdown-text)" {...props}>
      {props.children}
    </Heading>
  );
};

export const P = (props: any) => {
  return (
    <Text color="var(--markdown-text)" my={2} {...props}>
      {props.children}
    </Text>
  );
};

export const UL = (props: any) => {
  return (
    <Text color="var(--markdown-text)" my={2} {...props}>
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
        color="var(--markdown-accent)"
        {...props}
      >
        {props.children}
      </ChakraLink>
    );
  } else {
    return (
      <ChakraLink href={props.url} color="var(--markdown-accent)" {...props}>
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

interface DividerProps {
  marginBottom?: number;
  height?: number;
  lineType?: string;
}
export const Divider = ({ height = 1.5, lineType = "solid" }: DividerProps) => {
  return (
    <hr
      style={{
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

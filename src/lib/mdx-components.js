import Image from "next/image";
import { Box, Heading, Text, Link, Divider, Alert } from "@chakra-ui/react";

const ResponsiveImage = (props) => {
  return <Image {...props} alt={props.alt} width={700} height={300} style={{ borderRadius: 10, paddingY: "50px", objectFit: "cover" }} priority />;
};

const MDXComponents = {
  img: ResponsiveImage,
  h1: (props) => <Heading {...props} mt={20} variant="primary" size={{ base: "xl", md: "2xl" }} />,
  h2: (props) => <Heading {...props} mt={20} variant="primary" size={{ base: "lg", md: "xl" }} />,
  h3: (props) => <Heading {...props} mt={14} variant="primary" size={{ base: "md", md: "lg" }} />,
  p: (props) => <Text {...props} variant="custom" />,
  a: (props) => <Link {...props} variant="custom" isExternal />,
  hr: (props) => <Divider {...props} variant="inText" />,
  blockquote: (props) => <Alert {...props} variant="left-accent" />,
  ul: (props) => <Box as="ul" py={5} pl={4} {...props} />,
  ol: (props) => <Box as="ol" py={5} pl={4} ml={1} {...props} />,
  li: (props) => (
    <Box
      as="li"
      pb={0.5}
      lineHeight={2}
      fontSize={{ base: "md", lg: "lg", "2xl": "xl" }}
      fontWeight={400}
      color="light.text.secondary"
      _dark={{ color: "dark.text.secondary" }}
      {...props}
    />
  ),
};

export default MDXComponents;

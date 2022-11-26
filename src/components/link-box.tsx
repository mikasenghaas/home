import NextLink from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Badge, useColorModeValue } from "@chakra-ui/react";
import colors from "@/lib/theme/colors";

const LinkBox = ({ meta, href, orientation, ...props }: any) => {
  const primaryText = useColorModeValue("linear(to-l, light.text.primary, light.text.primary)", "linear(to-l, dark.text.primary, dark.text.primary");
  const tags = meta.tags ? meta.tags : [];

  return (
    <NextLink href={href}>
      <Flex
        position="relative"
        borderRadius="lg"
        direction={orientation == "vertical" ? "column" : "row"}
        alignItems="center"
        justifyContent={orientation == "vertical" ? "center" : "space-between"}
        transition="transform 0.2s"
        border={`2px solid ${colors.light.bg.tertiary}`}
        bgColor="light.bg.primary"
        {...props}
        _dark={{
          border: `2px solid ${colors.light.bg.tertiary}`,
          bgColor: "dark.bg.primary",
        }}
        _before={{
          content: "''",
          position: "absolute",
          zIndex: -1,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "linear-gradient(-45deg, #0e52f1 0%, #5686f5 100% )",
          filter: "blur(10px)",
          borderRadius: "inherit",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        _after={{
          content: "''",
          zIndex: -1,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "inherit",
          borderRadius: "inherit",
        }}
        _hover={{
          transform: "scale(1.02)",
          _before: {
            opacity: 0.7,
          },
        }}
        _active={{
          transform: "scale(.98)",
        }}
      >
        {meta.img ? (
          <Box position="relative" width="100%" height="200px" borderTopRadius="lg">
            <Image
              src={meta.img}
              alt={`project-${meta.id}`}
              quality={25}
              priority
              fill
              style={{ objectFit: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              sizes="(max-width: 400px): 100vw; 30vw"
            />
          </Box>
        ) : null}
        <Flex align="center" justify={orientation == "vertical" ? "center" : ""} width="100%" flex={1}>
          {meta.published && !(orientation == "vertical") && (
            <Text
              ml={5}
              minWidth={{ base: "60px", sm: "80px" }}
              fontSize={{ base: "xs", sm: "sm" }}
              fontWeight={500}
              color="light.text.secondary"
              _dark={{ color: "dark.text.secondary" }}
            >
              {new Date(meta.published).toLocaleString("en-US", { month: "short", year: "2-digit" })}
            </Text>
          )}
          <Flex align="center" mt={orientation == "vertical" ? 2 : 0}>
            <Text
              fontSize={orientation == "vertical" ? "2xl" : { base: "md", md: "lg" }}
              fontWeight={orientation == "vertical" ? 700 : 500}
              bgGradient={orientation == "vertical" ? "linear(to-l, #5686f5, #0e52f1)" : primaryText}
              bgClip="text"
              textAlign={orientation == "vertical" ? "center" : "left"}
              noOfLines={1}
            >
              {meta.title}
            </Text>
            {meta.recent ? (
              <Badge mx={3} fontSize="xs" variant="custom">
                Recent
              </Badge>
            ) : null}
          </Flex>
        </Flex>
        <Flex justifyContent="center" mb={orientation == "vertical" ? 5 : 0} mr={5}>
          {tags.map((tag: string) => {
            return (
              <Badge fontSize="xs" variant="custom" key={tag} mx={1} mt={2}>
                {tag}
              </Badge>
            );
          })}
          {meta.readTime && (
            <Badge fontSize={{ base: 10, sm: 12 }} mr={5} color="light.text.secondary" _dark={{ color: "dark.text.secondary" }} variant="gray">
              {meta.readTime}
            </Badge>
          )}
        </Flex>
      </Flex>
    </NextLink>
  );
};

export default LinkBox;

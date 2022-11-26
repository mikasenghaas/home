import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" h="30px" marginTop="auto" pb="2rem" pt="5rem">
      <Text color="light.text.tertiary" _dark={{ color: "dark.text.tertiary" }} mt=".2rem" fontSize="12px">
        &copy; Mika Senghaas, 2022
      </Text>
    </Flex>
  );
}

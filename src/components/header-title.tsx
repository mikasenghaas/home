import { useState } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { motion, useScroll } from "framer-motion";
import { text } from "stream/consumers";

const MotionFlex = motion(Flex);

export default function HeaderTitle({ title, ...props }: any) {
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const { scrollY } = useScroll();

  function handleScrollY(scrollY: number) {
    return scrollY > 350 ? false : true;
  }

  scrollY.onChange((latest) => {
    setIsLarge(handleScrollY(latest));
  });

  return (
    <MotionFlex
      zIndex={200}
      position="fixed"
      top={0}
      mt="24px"
      left={0}
      right={0}
      display={{ base: "none", lg: "block" }}
      animate={{ opacity: isLarge ? 0 : 1, y: isLarge ? 10 : 0 }}
      transition={{ duration: 0.2 }}
      {...props}
      mx="auto"
      width="100%"
      maxWidth="700px"
      align="flex-end"
    >
      <Heading variant="primary" fontSize="2xl" fontWeight={400}>
        {title}
      </Heading>
    </MotionFlex>
  );
}

import { useState, useEffect } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { motion, useScroll } from "framer-motion";

import colors from "@/lib/theme/colors";

// local imports
import Logo from "./logo";
import CV from "./cv";
import ColorModeSwitcher from "./color-mode-switcher";

const MotionFlex = motion(Flex);

export default function Header() {
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const { scrollY } = useScroll();
  const bgColor = useColorModeValue(colors.light.bg.tertiary, colors.dark.bg.tertiary);

  function handleScrollY(scrollY: number) {
    return scrollY > 60 ? false : true;
  }

  scrollY.onChange((latest) => {
    setIsLarge(handleScrollY(latest));
  });

  return (
    <MotionFlex
      position="fixed"
      zIndex={100}
      top={0}
      left={0}
      right={0}
      align="center"
      backdropFilter="blur(20px)"
      animate={{
        height: isLarge ? 120 : 70,
        borderBottom: isLarge ? ".5px solid transparent" : `.5px solid ${bgColor}`,
      }}
      transition={{ duration: 0.35 }}
      initial={false}
    >
      <Flex w="100%" align="center" justify="space-between" mx="auto" px={{ base: "25px", sm: "30px" }} maxWidth="900px">
        <Logo />
        <Flex align="center" justify="center">
          <CV />
          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </MotionFlex>
  );
}

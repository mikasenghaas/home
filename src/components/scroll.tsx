import { useState, useEffect } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const MotionBox = motion(Box);

export default function Scroll() {
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const { scrollY, scrollYProgress } = useScroll();
  const bgColor = useColorModeValue("light.accent.primary", "dark.accent.primary");

  function handleScrollY(scrollY: number) {
    return scrollY > 200 ? false : true;
  }

  /* eslint-disable */
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsLarge(handleScrollY(latest));
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isLarge && (
        <MotionBox
          position="fixed"
          top="70px"
          height="2px"
          transformOrigin="0%"
          left={0}
          right={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.35 } }}
          exit={{ opacity: 1, transition: { delay: 0, duration: 0 } }}
          style={{ scaleX: scrollYProgress }}
          bgColor={bgColor}
        />
      )}
    </AnimatePresence>
  );
}

// PageBox.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const fromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const PageBox = (props) => {
  return (
    <MotionBox
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      variants={fromBottom}
      zIndex={50}
    >
      {props.children}
    </MotionBox>
  );
};

export default PageBox;

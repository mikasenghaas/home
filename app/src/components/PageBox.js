// PageBox.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: -50 },
};

const PageBox = (props) => {
  return (
    <MotionBox
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      zIndex={50}
    >
      {props.children}
    </MotionBox>
  );
};

export default PageBox;

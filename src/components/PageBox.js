// PageBox.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useHistory } from "react-router-dom";

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
      transition={{ duration: .3}}
      variants={fromBottom}
      zIndex={50}
    >
      {props.children}
    </MotionBox>
  );
};

export default PageBox;

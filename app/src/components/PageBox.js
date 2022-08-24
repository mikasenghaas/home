// PageBox.tsx
// By: Mika Senghaas
import { useState, useEffect } from 'react'
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom'

const MotionBox = motion(Box);

const home = {
  initial: { opacity: 0, y: 100 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 },
};

const PageBox = (props) => {
  const [variant, setVariant] = useState(home)
  let location = useLocation()

  useEffect(() => {
    if (location === '/') {
      setVariant(home)
    } else {
      setVariant(home)
    }
  }, [])



  return (
    <MotionBox
      initial="initial"
      animate="in"
      exit="out"
      variants={variant}
      zIndex={50}
    >
      {props.children}
    </MotionBox>
  );
};

export default PageBox;

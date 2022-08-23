// Button.tsx
// By: Mika Senghaas

import { Button as ChakraButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(ChakraButton);

const Button3D = (props: any) => {
  return (
    <>
      <MotionButton
        transition={{ type: "spring", stiffness: 100, duration: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        {...props}
      >
        {props.children}
      </MotionButton>
    </>
  );
};

export default Button3D;

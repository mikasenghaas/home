// GlobalMessage.tsx
// By: Mika Senghaas

import { useState, useEffect } from "react";
import { Flex, CircularProgress, CloseButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import * as md from "../styles/MarkdownStyles";

const MotionFlex = motion(Flex);

const GlobalMessage = (props: any) => {
  const { message } = props.state;
  const [value, setValue] = useState<number>(0);

  const clearMessage = () => {
    props.setState((prev: any) => ({
      ...prev,
      message: "",
    }));
  };

  useEffect(() => {
    if (message) {
      if (value >= 100) {
        setValue(0);
        props.setState((prev: any) => ({
          ...prev,
          message: "",
        }));
      } else {
        setTimeout(() => {
          setValue(value + 2);
        }, 100);
      }
    }
  }, [message, value]);

  return (
    <AnimatePresence>
      {message && (
        <MotionFlex
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          position="fixed"
          bottom={0}
          right={0}
          m="2rem"
          px="1rem"
          maxWidth="100%"
          alignItems="center"
          justifyContent="space-between"
          bgColor="var(--markdown-code-bg)"
          borderRadius="10px"
        >
          <CircularProgress
            size="20px"
            thickness="10px"
            borderRadius="10px"
            color="var(--markdown-accent)"
            bgColor="var(--markdown-code-bg)"
            value={value}
          />
          <md.P mx="1rem">{message}</md.P>
          <CloseButton size="sm" onClick={clearMessage} />
        </MotionFlex>
      )}
    </AnimatePresence>
  );
};

export default GlobalMessage;

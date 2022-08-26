// EditorToggle.tsx
// By: Mika Senghaas

import { Flex, Switch } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// custom styles
import * as md from "../styles/MarkdownStyles";

const MotionFlex = motion(Flex);

const EditorToggle = (props: any) => {
  const { edit, toggleMode, admin } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionFlex
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={admin}
        alignItems="center"
        my="1rem"
      >
        <md.Badge color={!edit ? "var(--markdown-accent)" : "default"}>
          Preview
        </md.Badge>
        <Switch mx=".5rem" size="md" onChange={toggleMode} />
        <md.Badge color={edit ? "var(--markdown-accent)" : "default"}>
          Editor
        </md.Badge>
      </MotionFlex>
    </AnimatePresence>
  );
};
export default EditorToggle;

// ToggleAdmin.tsx
// By: Mika Senghaas

import { Flex } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import * as md from "../styles/MarkdownStyles";

const MotionFlex = motion(Flex);

const AdminToggle = (props: any) => {
  const { admin } = props.state;

  const toggleAdmin = () => {
    if (!admin) {
      const p = prompt("Password");
      if (p === process.env.REACT_APP_ADMIN_PASSWORD) {
        props.setState((prev: any) => ({
          ...prev,
          admin: true,
        }));
      }
    } else {
      props.setState((prev: any) => ({
        ...prev,
        admin: false,
      }));
    }
  };

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <MotionFlex
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={admin}

        alignItems='center'
      >
        {admin ?
          <MdDone size={10} />
          :
          <FiEdit size={10} />
        }
        <md.Link
          onClick={toggleAdmin}
          fontSize="12px"
          color="var(--markdown-text)"
          ml='2px'
        >
          {admin ? "Done" : "Edit"}
        </md.Link>
      </MotionFlex>
    </AnimatePresence>
  );
};

export default AdminToggle;

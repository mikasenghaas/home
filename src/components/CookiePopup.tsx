// CookiePopup.tsx
// By: Mika Senghaas

import { useState } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import * as md from "../styles/MarkdownStyles";

import ReactGA from "react-ga4";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const rotation = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 720,
    scale: 1.2,
    transition: {
      duration: 0.5,
    },
  },
};

const scale = {
  rest: { scale: 1 },
  hover: { scale: 1.2, transition: { duration: 0.2 } },
};

const CookiePopup = () => {
  const [show, setShow] = useState<boolean>(true);

  const handleAccept = () => {
    setShow(false);
    // initialise react ga
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID || "");
  };

  const handleDecline = () => {
    setShow(false);
  };

  const handleDrag = (_: any, info: any) => {
    if (info.point.x < 0) {
      handleAccept();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <MotionBox
          initial={{ opacity: 0, x: -100, transition: { ease: "easeOut" } }}
          animate={{ opacity: 1, x: 0, transition: { delay: 3 } }}
          exit={{
            opacity: 0,
            x: -100,
            transition: { delay: 0.2, ease: "easeIn" },
          }}
          transition={{ duration: 0.5, type: "spring" }}
          drag="x"
          dragConstraints={{ left: -500, right: 0 }}
          onDrag={(event: any, info: any) => handleDrag(event, info)}
          position="fixed"
          bottom={0}
          left={0}
          m="30px"
          p={3}
          maxWidth="450px"
          width="85%"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="10px"
          zIndex={100}
          boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
          bg="var(--markdown-code-bg)"
        >
          <md.H4>Cookie Policy</md.H4>
          <md.P>
            I am using personal{" "}
            <md.Link
              href="https://developers.google.com/analytics/devguides/collection/gtagjs/cookie-usage"
              isExternal
            >
              cookies
            </md.Link>{" "}
            🍪 to enable Google Analytics on my website.
          </md.P>
          <Flex mt={5} width="100%" justifyContent="space-between">
            <MotionButton
              flex={1}
              initial="rest"
              whileHover="hover"
              animate="rest"
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={handleDecline}
            >
              <MotionText>Disable</MotionText>
              <MotionText ml={1} variants={scale}>
                🚫
              </MotionText>
            </MotionButton>
            <MotionButton
              flex={2}
              ml={1}
              initial="rest"
              whileHover="hover"
              animate="rest"
              size="sm"
              variant="solid"
              colorScheme="green"
              onClick={handleAccept}
            >
              <MotionText>Allow Cookies</MotionText>
              <MotionText ml={1} variants={rotation}>
                🍪
              </MotionText>
            </MotionButton>
          </Flex>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default CookiePopup;

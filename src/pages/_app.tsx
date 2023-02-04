import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from '@vercel/analytics/react';

import Header from "@/components/header";
import Footer from "@/components/footer";

import MDXComponents from "@/lib/mdx-components";
import theme from "@/lib/theme";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const fromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <ChakraProvider theme={theme}>
        <MDXProvider components={MDXComponents}>
          <MotionBox mx="auto" left={0} right={0} px={{ base: "25px", sm: "30px" }} maxWidth="900px">
            <Header />
            <AnimatePresence mode="wait" initial={true}>
              <MotionFlex
                zIndex={5}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                variants={fromBottom}
                key={router.asPath}
                direction="column"
                minHeight="100vh"
              >
                <Component {...pageProps} />
                <Footer />
              </MotionFlex>
            </AnimatePresence>
          </MotionBox>
        </MDXProvider>
      </ChakraProvider>
      <Analytics />
    </>
  );
}

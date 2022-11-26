import { useRouter } from "next/router";
import NextLink from "next/link";
import { Link, Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionChakraBreadcrumb = motion(ChakraBreadcrumb);

export default function Breadcrumb(props: any) {
  const router = useRouter();
  const paths = router.asPath.split("/").slice(0, -1);
  return (
    <AnimatePresence>
      {router.asPath !== "/" ? (
        <MotionChakraBreadcrumb
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.35 } }}
          exit={{ opacity: 0, transition: { delay: 0 } }}
          zIndex={10}
          separator={<ChevronRightIcon mt={-1} color="light.accent.primary" _dark={{ color: "dark.accent.primary" }} />}
          {...props}
        >
          {paths.map((path: string, index: number) => {
            return (
              <BreadcrumbItem key={path}>
                <NextLink href={`/${paths.slice(1, index + 1).join("/")}`} passHref legacyBehavior scroll={false}>
                  <Link variant="custom" fontWeight={300}>
                    {path ? path.at(0)?.toUpperCase() + path.substring(1) : "Home"}
                  </Link>
                </NextLink>
              </BreadcrumbItem>
            );
          })}
        </MotionChakraBreadcrumb>
      ) : null}
    </AnimatePresence>
  );
}

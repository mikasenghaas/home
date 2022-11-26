import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import colors from "../colors";

const custom = defineStyle({
  fontWeight: 500,
  color: "light.accent.primary",
  pb: "1px",
  borderBottom: "2px solid transparent",
  transition: "border-bottom .2s",
  _dark: {
    color: "dark.accent.primary",
  },

  _hover: {
    borderBottom: `2px solid ${colors.light.accent.primary}`,
    _dark: {
      borderBottom: `2px solid ${colors.dark.accent.primary}`,
    },
  },
});

const linkTheme = defineStyleConfig({
  baseStyle: {
    textDecoration: "none",
    _hover: {
      textDecoration: "none",
    },
  },
  variants: { custom },
});

export default linkTheme;

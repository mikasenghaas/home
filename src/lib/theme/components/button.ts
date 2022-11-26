import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import colors from "../colors";

const custom = defineStyle({
  m: 1,
  boxSizing: "border-box",
  bgColor: "light.bg.tertiary",
  transition: "color .2s, border .2s, box-shadow .4s",
  boxShadow: "0 0 0 transparent",
  border: "1px solid transparent",
  _dark: {
    bgColor: "dark.bg.tertiary",
  },

  _hover: {
    color: "light.accent.primary",
    border: `1px solid ${colors.light.accent.primary}`,
    boxShadow: `0 0 10px 0.5px ${colors.light.accent.secondary}`,

    _dark: {
      color: "dark.accent.primary",
      border: `1px solid ${colors.dark.accent.primary}`,
      boxShadow: `0 0 20px 0.5px ${colors.dark.accent.secondary}`,
    },
  },
  _active: {
    transform: "scale(0.95)",
  },
});

const buttonTheme = defineStyleConfig({
  variants: { custom },
});

export default buttonTheme;

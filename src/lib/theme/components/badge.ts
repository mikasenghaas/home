import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const custom = defineStyle({
  color: "light.accent.primary",
  background: "light.accent.tertiary",

  _dark: {
    color: "dark.accent.primary",
    background: "dark.accent.tertiary",
  },
});

const badgeTheme = defineStyleConfig({
  baseStyle: {
    fontSize: "13px",
  },
  variants: { custom },
});

export default badgeTheme;

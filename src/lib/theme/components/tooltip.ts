import { defineStyleConfig } from "@chakra-ui/react";

const tooltipTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "lg",
    bgColor: "light.accent.tertiary",
    color: "light.accent.primary",

    _dark: {
      bgColor: "dark.accent.tertiary",
      color: "dark.accent.primary",
    },
  },
});

export default tooltipTheme;

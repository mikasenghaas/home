import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
  color: "light.text.primary",
  _dark: {
    color: "dark.text.primary",
  },
});

const secondary = defineStyle({
  color: "light.text.secondary",
  _dark: {
    color: "dark.text.secondary",
  },
});

const headingTheme = defineStyleConfig({
  variants: { primary, secondary },
});

export default headingTheme;

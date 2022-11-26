import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const custom = defineStyle({
  color: "light.text.secondary",
  fontSize: { base: "md", lg: "lg", "2xl": "xl" },
  fontWeight: 400,
  lineHeight: 2,

  _dark: {
    color: "dark.text.secondary",
  },
});

const code = defineStyle({
  color: "light.accent.primary",
  fontSize: { base: "md", lg: "lg", "2xl": "xl" },
  fontWeight: 400,
  lineHeight: 2,

  _dark: {
    color: "dark.accent.primary",
  },
});

const gradient = defineStyle({
  bgGradient: "linear(to-l, #7928CA, #FF0080)",
  bgClip: "text",
});

const textTheme = defineStyleConfig({
  variants: { custom, code, gradient },
  defaultProps: {},
});

export default textTheme;

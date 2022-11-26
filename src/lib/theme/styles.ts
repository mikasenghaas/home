import { color } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colors from "./colors";

const styles = {
  global: (props: any) => ({
    "html, body": {
      background: mode("#f9fafb", "#16181d")(props), //mode(light, dark)
      "*::selection": {
        background: mode(colors.light.accent.tertiary, colors.dark.accent.tertiary)(props),
        color: mode(colors.light.accent.primary, colors.dark.accent.primary)(props),
      },
      ".katex-display": {
        background: mode(colors.light.bg.tertiary, colors.dark.bg.tertiary)(props),
        overflowX: "scroll",
        py: 5,
        borderRadius: 5,
      },
      code: {
        background: mode(colors.light.bg.tertiary, colors.dark.bg.tertiary)(props),
        color: mode(colors.light.accent.primary, colors.dark.accent.primary)(props),
        borderRadius: 5,
        p: 1,
      },
      pre: {
        bgColor: "rgba(0, 0, 0, 0.15)",
        overflowX: "scroll",
        borderRadius: 5,
        my: 2,
      },
      strong: {
        color: mode(colors.light.text.primary, colors.dark.text.primary)(props),
      },
    },
  }),
};

export default styles;

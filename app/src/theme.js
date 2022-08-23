import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#141214")(props),
    },
    ":root": {
      // markdown specific colors (both for light and darkmode)
      "--markdown-text": mode("#24292f", "#c9d1d9")(props),
      "--markdown-text-inverse": mode("#c9d1d9", "#24292f")(props),
      "--markdown-text-inverse": mode("#c9d1d9", "#24292f")(props),
      "--markdown-code-bg": mode("#f6f8fa", "#161b22")(props),
      "--markdown-link": mode("#0969da", "#58a6ff")(props),
      "--markdown-accent": "#FF784F"
    },
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  }),
};

const components = {
}

const config = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  styles,
  config,
});

export default theme;

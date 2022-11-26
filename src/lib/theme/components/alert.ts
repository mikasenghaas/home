import { alertAnatomy } from "@chakra-ui/anatomy";
import { useColorModeValue, createMultiStyleConfigHelpers, defineStyleConfig } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bgColor: "light.bg.tertiary",
    color: "light.text.primary",
    borderInlineStartColor: "light.accent.primary",
    css: {
      "> *:first-of-type": {
        marginTop: 0,
        marginLeft: 8,
      },
    },
    my: 5,

    _dark: {
      bgColor: "dark.bg.tertiary",
      color: "dark.text.primary",
      borderInlineStartColor: "dark.accent.primary",
    },
  },
});

const italic = definePartsStyle({
  container: {
    fontStyle: "italic",
  },
});

const alertTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { italic },
});

export default alertTheme;

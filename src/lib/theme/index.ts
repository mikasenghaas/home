import { extendTheme } from "@chakra-ui/react";

// global style overrides
import styles from "./styles";
import config from "./config";
import colors from "./colors";

// component style overrides
import headingTheme from "./components/heading";
import textTheme from "./components/text";
import buttonTheme from "./components/button";
import badgeTheme from "./components/badge";
import linkTheme from "./components/link";
import dividerTheme from "./components/divider";
import alertTheme from "./components/alert";
import tooltipTheme from "./components/tooltip";

const overrides = {
  styles,
  config,
  colors,
  components: {
    Heading: headingTheme,
    Text: textTheme,
    Button: buttonTheme,
    IconButton: buttonTheme,
    Badge: badgeTheme,
    Link: linkTheme,
    Divider: dividerTheme,
    Alert: alertTheme,
    Tooltip: tooltipTheme,
  },
};

export default extendTheme(overrides);

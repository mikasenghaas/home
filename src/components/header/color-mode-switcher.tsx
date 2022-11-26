import { IconButton, Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

export default function ColorModeSwitcher() {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const switchMode = useColorModeValue("Dark", "Light");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Tooltip label={`Switch to ${switchMode} Mode`}>
        <MotionIconButton
          variant="custom"
          initial={{ x: -3, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={useColorModeValue("light", "dark")}
          size="md"
          aria-label={`Switch to ${switchMode} Mode`}
          color="current"
          marginLeft="2"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />
      </Tooltip>
    </AnimatePresence>
  );
}

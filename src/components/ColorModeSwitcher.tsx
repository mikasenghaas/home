// ColorModeSwitcher.tsx
// By: Mika Senghaas

import {
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion'

const MotionIconButton = motion(IconButton)

interface Props { }
const ColorModeSwitcher = ({ ...props }: Props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <MotionIconButton
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ duration: 0.1 }}
        key={useColorModeValue('light', 'dark')}

        whileHover={{ scale: 1.05 }}
        size="md"
        aria-label={`Switch to ${text} mode`}
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
    </AnimatePresence>
  );
};

export default ColorModeSwitcher

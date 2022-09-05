// Header.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";

// hooks
import useWindowDimensions from "../hooks/useWindowSize";

// components
import ColorModeSwitcher from "./ColorModeSwitcher";
import Banner from "./Banner";
import Container from "./Container";

import ReactGA from "react-ga4";

const Logo = () => {
  return (
    <Link to="/">
      <Heading fontSize="lg">jonas-mika</Heading>
    </Link>
  );
};

interface Props {
  width: number;
}
const MenuComponent = (props: Props) => {
  const menuItems = ["About", "Teaching", "Projects", "CV"];
  let { pathname } = useLocation();
  const [isActive, setIsActive] = useState("");
  const current = useColorModeValue("black", "white");

  useEffect(() => {
    if (pathname === "/") {
      setIsActive("/");
    } else {
      menuItems.map((menuItem: string) => {
        if (pathname.match(menuItem)) {
          setIsActive(menuItem);
        }
      });
    }
  }, [pathname]);

  const trackEvent = (category: string, action: string, label: string) => {
    ReactGA.send({
      category: category,
      action: action,
      label: label,
    });
  };

  if (props.width < 700) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<GiHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          <Link to="about">
            <MenuItem>About</MenuItem>
          </Link>
          <Link to="teaching">
            <MenuItem>Teaching</MenuItem>
          </Link>
          <Link to="projects">
            <MenuItem>Projects</MenuItem>
          </Link>
          <Link
            to="/assets/cv.pdf"
            onClick={() => trackEvent("File Download", "CV", "Files")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MenuItem>
              CV
              <AiOutlineFilePdf style={{ marginLeft: 5 }} color={current} />
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );
  } else {
    // desktop
    return (
      <Flex>
        <Button
          as={Link}
          to="/about"
          mx="2px"
          variant={isActive === "About" ? "solid" : "ghost"}
        >
          About
        </Button>
        <Button
          as={Link}
          to="/teaching"
          mx="2px"
          variant={isActive === "Teaching" ? "solid" : "ghost"}
        >
          Teaching
        </Button>
        <Button
          as={Link}
          to="/projects"
          mx="2px"
          variant={isActive === "Projects" ? "solid" : "ghost"}
        >
          Projects
        </Button>
        <IconButton
          as={Link}
          to="/assets/cv.pdf"
          onClick={() => trackEvent("File Download", "CV", "Files")}
          target="_blank"
          rel="noopener noreferrer"
          mx="2px"
          variant="solid"
          aria-label="Open CV"
          color={current}
          icon={<AiOutlineFilePdf />}
        />
      </Flex>
    );
  }
};

const Header = () => {
  const { width } = useWindowDimensions();

  return (
    <Banner
      position="fixed"
      zIndex={100}
      bg="blackAlpha.50"
      height="60px"
      backdropFilter="blur(10px)"
    >
      <Container>
        <Flex height="60px" alignItems="center" justifyContent="space-between">
          <Logo />
          <Flex width="50%" justifyContent="flex-end" alignItems="center">
            <MenuComponent width={width} />
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      </Container>
    </Banner>
  );
};

export default Header;

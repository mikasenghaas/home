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
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

// hooks
import useWindowDimensions from "../hooks/useWindowSize";

// components
import ColorModeSwitcher from "./ColorModeSwitcher";
import Banner from "./Banner";
import Container from "./Container";

const Logo = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Heading
      fontSize="20px"
      onClick={handleClick}
      _hover={{ cursor: "pointer" }}
    >
      jonas-mika
    </Heading>
  );
};

interface Props {
  width: number;
}
const MenuComponent = (props: Props) => {
  const menuItems = ["about", "teaching", "projects"];
  let { pathname } = useLocation();
  const [isActive, setIsActive] = useState("");

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

  if (props.width < 600) {
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
        </MenuList>
      </Menu>
    );
  } else {
    // desktop
    return (
      <Flex>
        {menuItems.map((menuItem: string, i: number) => {
          return (
            <Link key={i} to={menuItem}>
              <Button
                mx="2px"
                variant={isActive === menuItem ? "solid" : "ghost"}
              >
                {menuItem[0].toUpperCase() + menuItem.substring(1)}
              </Button>
            </Link>
          );
        })}
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

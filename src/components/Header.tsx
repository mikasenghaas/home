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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";

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
  const menuItems = ["About", "Teaching", "Projects", "CV"];
  let { pathname } = useLocation();
  const [isActive, setIsActive] = useState("");
  const current = useColorModeValue("black", "white")

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
          <Link to='/assets/cv.pdf' target='_blank' rel='noopener noreferrer'>
            <MenuItem>
              CV
              <AiOutlineFilePdf style={{marginLeft: 5}} color={current}/>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );
  } else {
    // desktop
    return (
      <Flex>
        <Link to='/about'>
          <Button
            mx="2px"
            variant={isActive === 'About' ? "solid" : "ghost"}
          >
            About
          </Button>
        </Link>
        <Link to='/teaching'>
          <Button
            mx="2px"
            variant={isActive === 'Teaching' ? "solid" : "ghost"}
          >
            Teaching
          </Button>
        </Link>
        <Link to='/projects'>
          <Button
            mx="2px"
            variant={isActive === 'Projects' ? "solid" : "ghost"}
          >
            Projects
          </Button>
        </Link>
        <Link to='/assets/cv.pdf' target='_blank' rel='noopener noreferrer'>
          <IconButton
            mx="2px"
            variant="solid"
            aria-label='Open CV'
            color={current}
            icon={<AiOutlineFilePdf />}
          />
        </Link>
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

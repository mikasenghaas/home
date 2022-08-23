// App.tsx
// By: Mika Senghaas

// imports
import { useEffect } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import theme from './theme'

// components
import Container from "./components/Container";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Teaching from "./pages/Teaching";
import Course from "./pages/Course";
import Material from "./pages/Material";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    console.log(theme)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Flex
            direction='column'
            minHeight='100vh'
          >
          <Header />
          <Hero />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/teaching" element={<Teaching />}>
              <Route path=":course" element={<Course />}>
                <Route path=":material" element={<Material />} />
              </Route>
            </Route>
            <Route path="/projects" element={<Projects />}>
              <Route path=":project" element={<Project />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          </Flex>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

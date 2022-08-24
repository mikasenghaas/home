// App.tsx
// By: Mika Senghaas

// imports
import { useState, useEffect } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import "./App.css";
import theme from "./theme";
import httpClient from './httpClient'

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
  const [state, setState] = useState({
    courses: {},
    material: {},
    loadingCourses: true,
    loadingMaterial: true,
  })

  useEffect(() => {
    httpClient.get('/api/get_courses')
      .then(res => {
        console.log('fetched courses')
        setState(prev => ({
          ...prev,
          courses: res.data,
          loadingCourses: false
        }))
      })

    httpClient.get('/api/get_material')
      .then(res => {
        console.log('fetched material')
        setState(prev => ({
          ...prev,
          material: res.data,
          loadingMaterial: false
        }))
      })

  }, [])

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Hero />
            {state.loading ? 
            <h1>Loading</h1>
              :
            <AnimatePresence
              initial={{ x: 0 }}
              animate={{ x: 200 }}
              exit={{ x: 0 }}
            >
              <Routes>
                <Route
                  path="/teaching/:course_short/:material_name"
                  element={<Material state={state} />}
                />
                <Route
                  path="/teaching/:course_short"
                  element={<Course state={state} />}
                />
                <Route path="/teaching" element={<Teaching state={state} />} />

                <Route path="/projects/:project" element={<Project />} />
                <Route path="/projects" element={<Projects />} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            }
            <Footer />
          </Flex>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

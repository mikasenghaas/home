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
import GlobalMessage from "./components/GlobalMessage";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Teaching from "./pages/Teaching";
import Course from "./pages/Course";
import Material from "./pages/Material";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Admin from "./pages/Admin";
import NewMaterial from "./pages/NewMaterial";
import NewCourse from "./pages/NewCourse";
import NotFound from "./pages/NotFound";

const App = () => {
  const [state, setState] = useState({
    courses: JSON.parse(localStorage.getItem('courses')) || [],
    material: JSON.parse(localStorage.getItem('material')) || [],
    loadingCourses: true,
    loadingMaterial: true,
    admin: false,
    message: ""
  })

  useEffect(() => {
    if (state.courses !== []) {
      httpClient.get('/api/get_courses')
        .then(res => {
          console.log('fetched courses')
          setState(prev => ({
            ...prev,
            courses: res.data,
            loadingCourses: false
          }))
          localStorage.setItem('courses', JSON.stringify(res.data))
        })
    }

    if (state.material !== []) {
      httpClient.get('/api/get_material')
        .then(res => {
          console.log('fetched material')
          setState(prev => ({
            ...prev,
            material: res.data,
            loadingMaterial: false
          }))
          localStorage.setItem('material', JSON.stringify(res.data))
        })
    }
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
              <AnimatePresence>
                <Routes>
                  <Route path="/teaching/new-course" element={<NewCourse state={state} setState={setState} />} />
                  <Route
                    path="/teaching/:course_short/new-material"
                    element={<NewMaterial state={state} setState={setState} />}
                  />
                  <Route
                    path="/teaching/:course_short/:material_name"
                    element={<Material state={state} setState={setState} />}
                  />
                  <Route
                    path="/teaching/:course_short"
                    element={<Course state={state} setState={setState} />}
                  />
                  <Route path="/teaching" element={<Teaching state={state} setState={setState} />} />

                  <Route path="/projects/:project" element={<Project />} />
                  <Route path="/projects" element={<Projects />} />

                  <Route path="/admin" element={<Admin state={state} setState={setState} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            }
            <GlobalMessage state={state} setState={setState} />
            <Footer state={state} setState={setState} />
          </Flex>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

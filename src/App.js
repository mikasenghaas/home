// App.tsx
// By: Mika Senghaas

// imports
import { useState, useEffect } from "react";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AnimatePresence } from "framer-motion";

import "./App.css";
import theme from "./theme";
import httpClient from "./httpClient";

// components
import Container from "./components/Container";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import GlobalMessage from "./components/GlobalMessage";
import HistoryRouter from "./components/HistoryRouter";

const App = () => {
  const [state, setState] = useState({
    courses: JSON.parse(localStorage.getItem("courses")) || [],
    material: JSON.parse(localStorage.getItem("material")) || [],
    loadingCourses: true,
    loadingMaterial: true,
    admin: false, // admin rights to edit content
    message: "", // globally show message
    prevPage: null, // used to conditionally animate pages
  });

  // keep brower history
  const history = createBrowserHistory();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (state.courses !== []) {
      httpClient.get("/api/get_courses").then((res) => {
        console.log("fetched courses");
        setState((prev) => ({
          ...prev,
          courses: res.data,
          loadingCourses: false,
        }));
        localStorage.setItem("courses", JSON.stringify(res.data));
      });
    }

    if (state.material !== []) {
      httpClient.get("/api/get_material").then((res) => {
        console.log("fetched material");
        setState((prev) => ({
          ...prev,
          material: res.data,
          loadingMaterial: false,
        }));
        localStorage.setItem("material", JSON.stringify(res.data));
      });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <HistoryRouter history={history}>
        <Container>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Hero />
            {state.loading ? (
              <Flex justifyContent="center">
                <Spinner />
              </Flex>
            ) : (
              <AnimatedRoutes state={state} setState={setState} />
            )}
            <GlobalMessage state={state} setState={setState} />
            <Footer state={state} setState={setState} />
          </Flex>
        </Container>
      </HistoryRouter>
    </ChakraProvider>
  );
};

export default App;

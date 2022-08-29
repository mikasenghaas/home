// App.tsx
// By: Mika Senghaas

// imports
import { useState, useEffect } from "react";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { createBrowserHistory } from "history";

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
    projects: [
      {
        name: "Tanja Senghaas Portfolio",
        short_name: "tanja-senghaas",
        desc: "Portfolio website for Tanja Senghaas",
        date: new Date("2021"),
        topic: "webdev",
        stack: "React, Framer Motion",
        link: "https://tanjasenghaas.netlify.app/",
        images: ["/images/tanja-senghaas.png"],
      },
      {
        name: "Verstappen vs. Hamilton",
        short_name: "ver-vs-ham",
        desc: "A data visualisation project displaying the close fight for the 2021 F1 Driver Championship.",
        date: new Date("2022"),
        topic: "Data Visualisation",
        stack: "Python, Photoshop, Tableau",
        link: "https://public.tableau.com/app/profile/jonas.mika.senghaas/viz/Verstappenvs_Hamilton/Dashboard",
        images: ["/images/ver-vs-ham.png"],
      },
    ],
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

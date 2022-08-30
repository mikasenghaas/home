// App.tsx
// By: Mika Senghaas

// imports
import { useState, useEffect } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
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
import Loading from "./components/Loading";

// setup analytics
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);

const App = () => {
  const [state, setState] = useState({
    courses: [],
    material: [],
    projects: [],
    loading: true,
    admin: false, // admin rights to edit content
    message: "", // globally show message
    prevPage: null, // used to conditionally animate pages
  });

  // keep brower history
  const history = createBrowserHistory();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    httpClient
      .get("/api/get_all")
      .then((res) => {
        setState((prev) => ({
          ...prev,
          courses: res.data.courses,
          material: res.data.material,
          projects: res.data.projects,
          loading: false,
        }));
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          message: "Could not fetch content. Try again later.",
        }));
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <HistoryRouter history={history}>
        <Container>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Hero />
            {state.loadingCourses || state.loadingMaterial ? (
              <Loading />
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

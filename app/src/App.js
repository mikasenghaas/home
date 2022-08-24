// App.tsx
// By: Mika Senghaas

// imports
import { useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import "./App.css";

import theme from "./theme";

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
    courses: [
      {
        name: "Machine Learning",
        short: "ml",
        tags: ["fall 2002", "therese graversen"],
        materials: [
          {
            name: "week-0-introduction",
            created_at: "23/08/22",
            edited_at: "23/08/22",
            markdown: `
# 00 Introduction

This is a test of a markdown document.

And this is a [link](https://www.github.com/jonas-mika)
`,
          },
          {
            name: "week-01-test",
            created_at: "23/08/22",
            edited_at: "23/08/22",
            markdown: `# 01 Test

This is a test of a **markdown document**.

---

And this is a [link](https://www.github.com/jonas-mika)
`,
          },
        ],
      },
      {
        name: "Linear Algebra and Optimisation",
        short: "lao",
        tags: ["fall 2002", "rasmus ejlers"],
        materials: [
          {
            name: "week-0-introduction",
            created_at: "23/08/22",
            edited_at: "23/08/22",
            markdown: `
# 00 Introduction

This is a test of a markdown document.

---

### H3 Headline

---

And this is a [link](https://www.github.com/jonas-mika).
<InlineMath>This is some cool math $1+1=2$</InlineMath>

<MathBlock>
$$
\\sqrt{16}=4
$$
</MathBlock>

<Emoji>sparkles</Emoji> This is a test

And this is code

\`\`\`python
print('hello world')
\`\`\`
`,
          },
          {
            name: "week-01-test",
            created_at: "23/08/22",
            edited_at: "23/08/22",
            markdown: `
# 01 Test

This is a test of a markdown document.

knd this is a [link](https://www.github.com/jonas-mika)
`,
          },
        ],
      },
    ],
    projects: [
      {
        name: "Test",
        short: "test",
        bio: "description",
        material: {},
      },
      {
        name: "Test2",
        short: "test2",
        bio: "description",
        material: {},
      },
    ],
  });

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Hero />
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
            <Footer />
          </Flex>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

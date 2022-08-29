import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Teaching from "../pages/Teaching";
import Course from "../pages/Course";
import Material from "../pages/Material";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import NewMaterial from "../pages/NewMaterial";
import NewCourse from "../pages/NewCourse";
import NewProject from "../pages/NewProject";
import NotFound from "../pages/NotFound";

const AnimatedRoutes = (props: any) => {
  let location = useLocation();
  const { state, setState } = props;
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={true}
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0 });
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/projects/new-project"
          element={<NewProject state={state} setState={setState} />}
        />
        <Route
          path="/teaching/new-course"
          element={<NewCourse state={state} setState={setState} />}
        />
        <Route
          path="/teaching/:course_short/new-material"
          element={<NewMaterial state={state} setState={setState} />}
        />
        <Route
          path="/teaching/:course_short/:material_short"
          element={<Material state={state} setState={setState} />}
        />
        <Route
          path="/teaching/:course_short"
          element={<Course state={state} setState={setState} />}
        />
        <Route
          path="/teaching"
          element={<Teaching state={state} setState={setState} />}
        />

        <Route
          path="/projects/:project_short"
          element={<Project state={state} setState={setState} />}
        />
        <Route
          path="/projects"
          element={<Projects state={state} setState={setState} />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home state={state} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

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
import Admin from "../pages/Admin";
import NewMaterial from "../pages/NewMaterial";
import NewCourse from "../pages/NewCourse";
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
          path="/teaching/new-course"
          element={<NewCourse state={state} setState={setState} />}
        />
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
        <Route
          path="/teaching"
          element={<Teaching state={state} setState={setState} />}
        />

        <Route path="/projects/:project" element={<Project state={state}/>} />
        <Route path="/projects" element={<Projects state={state}/>} />

        <Route
          path="/admin"
          element={<Admin state={state} setState={setState} />}
        />
        <Route path="/about" element={<About state={state}/>} />
        <Route path="/" element={<Home state={state} />} />
        <Route path="*" element={<NotFound state={state} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

// Teaching.tsx
// By: Mika Senghaas
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom componenents
import PageBox from "../components/PageBox";
import CourseBox from "../components/CourseBox";
import TraceBack from "../components/TraceBack";
import Markdown from "../components/Markdown";

// analytics
import ReactGA from "react-ga4";

const MotionButton = motion(Button);

const Teaching = (props: any) => {
  ReactGA.send({ hitType: "pageview", page: "/teaching" });

  const navigate = useNavigate();
  const { courses, loadingCourses, admin } = props.state;

  useEffect(() => {
    document.title = "Teaching - Mika Senghaas";
  }, []);

  const order = (a: any, b: any) => {
    const dateA = Date.parse(a["created"]);
    const dateB = Date.parse(b["created"]);
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  };

  const text = `
# Teaching 

---

In this section I gather all relevant course material (lecture notes, exercise solutions, 
code snippets) that I believe to be helpful for my students to assist their
learning.

Most content is processed material from when I took these courses, therefore I *do
not guarantee correctness* of all contents. You should also not take this material as an 
excuse to not take your own notes or do the exercises yourself. 
You learn while taking notes and doing the exercises *yourself* - so, don't skip this part. 
Come here to verify your own understanding or when you really struggle to grasp a concept.
`;

  return (
    <PageBox>
      <TraceBack />
      <Markdown>{text}</Markdown>
      <md.P></md.P>
      <md.H2 mt="2.5rem">Courses</md.H2>
      <md.Divider />
      {!loadingCourses &&
        courses.sort(order).map((course: any, i: number) => {
          return (
            <CourseBox
              key={i}
              course={course}
              setState={props.setState}
              admin={admin}
            />
          );
        })}
      <AnimatePresence>
        {admin && (
          <MotionButton
            initial={{ height: 0 }}
            animate={{ height: "40px" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            variant="outline"
            w="100%"
            my=".5rem"
            _hover={{ backgroundColor: "var(--markdown-accent)" }}
            onClick={() => navigate("/teaching/new-course")}
          >
            Add Course
          </MotionButton>
        )}
      </AnimatePresence>
      <Outlet />
    </PageBox>
  );
};

export default Teaching;

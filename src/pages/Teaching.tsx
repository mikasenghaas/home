// Teaching.tsx
// By: Mika Senghaas
import { useEffect } from 'react'
import { Button } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion'

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom componenents
import PageBox from "../components/PageBox";
import CourseBox from "../components/CourseBox";
import TraceBack from "../components/TraceBack"

const MotionButton = motion(Button)

const Teaching = (props: any) => {
  const navigate = useNavigate();
  const { courses, loadingCourses, admin } = props.state;

  useEffect(() => {
    document.title = 'teaching@jonas-mika'
  }, [])

  return (
    <PageBox>
      <TraceBack />
      <md.H1 mt="1.5rem">Teaching</md.H1>
      <md.Divider />
      <md.P>
        This page is meant for my students from{" "}
        <md.Link url="https://en.itu.dk" isExternal>
          ITU
        </md.Link>
        . Prior to exercise classes, I upload lecture notes and exercise
        material.
      </md.P>
      <md.P>
        Most content is processed material from my course notes, therefore I do
        not guarantee correctness of all contents. That said, I do believe all
        material to be useful for verifying the own learning while taking the
        course. I *do not* recommend only using these notes. The content here
        should merely assist your learning.
      </md.P>
      <md.H2 mt="2.5rem">Courses</md.H2>
      <md.Divider />
      {!loadingCourses &&
        courses.map((course: any, i: number) => {
          return <CourseBox key={i} course={course} setState={props.setState} admin={admin} />;
        })}
      <AnimatePresence>
        {admin && (
          <MotionButton
            initial={{ height: 0 }}
            animate={{ height: '40px' }}
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

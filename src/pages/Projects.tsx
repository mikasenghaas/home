// Projects.tsx
// By: Mika Senghaas
import { useEffect } from "react";
import { Grid, Button } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import ProjectBox from "../components/ProjectBox";
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import Loading from "../components/Loading";

import ReactGA from "react-ga4";

const MotionButton = motion(Button);

const Projects = (props: any) => {
  ReactGA.send({ hitType: "pageview", page: "/projects" });

  let navigate = useNavigate();
  const { projects, admin } = props.state;

  useEffect(() => {
    document.title = "Projects - Mika Senghaas";
  }, []);

  return (
    <PageBox>
      <TraceBack />
      <md.H1 mt="1.5rem">Projects</md.H1>
      <md.Divider />
      {props.state.loading ? (
        <Loading mt="2rem" size="md" />
      ) : (
        <Grid
          my={4}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
          gap={6}
        >
          {projects.map((project: any, i: number) => {
            return <ProjectBox key={i} project={project} />;
          })}
        </Grid>
      )}
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
            onClick={() => navigate("/projects/new-project")}
          >
            Add Project
          </MotionButton>
        )}
      </AnimatePresence>
    </PageBox>
  );
};

export default Projects;

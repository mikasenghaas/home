// Projects.tsx
// By: Mika Senghaas
import { Grid, GridItem } from "@chakra-ui/react";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import ProjectBox from "../components/ProjectBox"
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";

const Projects = (props: any) => {
  const { projects } = props.state

  return (
    <PageBox>
      <TraceBack />
      <md.H1 mt="1.5rem">Projects</md.H1>
      <md.Divider />
      <Grid templateColumns={{"base": "repeat(1, 1fr)", "sm": "repeat(2, 1fr)"}} gap={6}>
        {projects.map((project: any, i: number) => {
          return (
            <ProjectBox key={i} project={project}/>
          );
        })}
      </Grid>
    </PageBox>
  );
};

export default Projects;

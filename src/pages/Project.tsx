// Project.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from "@chakra-ui/react";

// custom pages
import NotFound from "../pages/NotFound";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle";
import ProjectTemplate from "../components/ProjectTemplate";
import Loading from "../components/Loading";
import httpClient from "../httpClient";

import * as md from "../styles/MarkdownStyles";

const Project = (props: any) => {
  const { project_short } = useParams();
  const { projects, admin } = props.state;

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [project, setProject] = useState({
    id: "",
    name: "",
    short_name: "",
    desc: "",
    year: "",
    topic: "",
    stack: "",
    link: "",
    images: "",
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    /* search for project through requested url route */
    const current_project = projects.find(
      (p: any) => p.short_name === project_short
    );

    if (current_project) {
      setProject(current_project);
      document.title = `${current_project.name} - Mika Senghaas`;
    }
  }, [projects]);

  const updatedProjects = (new_project: any) => {
    const remaining_projects = projects.filter(
      (p: any) => p.id !== new_project.id
    );
    return [...remaining_projects, new_project];
  };

  const submit = () => {
    setLoading(true);
    httpClient
      .post("/api/edit_project", {
        ...project,
        password: process.env.REACT_APP_ADMIN_PASSWORD,
      })
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          admin: false,
          projects: updatedProjects(res.data.project),
          message: res.data.msg,
        }));
        setLoading(false);
      })
      .catch(() => {
        props.setState((prev: any) => ({
          ...prev,
          message: "Could not edit project. Try again later.",
        }));
        setLoading(false);
      });
  };

  const setName = (e: any) => {
    setProject((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const setShortName = (e: any) => {
    setProject((prev) => ({
      ...prev,
      short_name: e.target.value,
    }));
  };

  const setDesc = (e: any) => {
    setProject((prev) => ({
      ...prev,
      desc: e.target.value,
    }));
  };

  const setYear = (e: any) => {
    setProject((prev) => ({
      ...prev,
      year: e.target.value,
    }));
  };

  const setTopic = (e: any) => {
    setProject((prev) => ({
      ...prev,
      topic: e.target.value,
    }));
  };

  const setStack = (e: any) => {
    setProject((prev) => ({
      ...prev,
      stack: e.target.value,
    }));
  };

  const setLink = (e: any) => {
    setProject((prev) => ({
      ...prev,
      link: e.target.value,
    }));
  };

  const setImages = (e: any) => {
    setProject((prev) => ({
      ...prev,
      images: e.target.value,
    }));
  };

  const toggleMode = () => {
    setEdit(!edit);
  };

  if (props.state.loading) {
    return <Loading />;
  }
  if (!project) {
    return <NotFound />;
  } else if (admin) {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height="50px">
          <TraceBack />
          <EditorToggle edit={edit} toggleMode={toggleMode} admin={admin} />
        </Flex>
        {edit ? (
          <>
            <md.H1>Edit Project</md.H1>
            <md.Divider />
            <md.P>
              Create new or edit existing material using markdown style. Use the
              input fields, switch to preview mode and hit save if you are happy
              with your changes.
            </md.P>
            <FormControl my="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={project.name}
                onChange={setName}
              />
            </FormControl>
            <Flex alignItems="center">
              <FormControl my="1rem">
                <FormLabel>Short Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Short Name"
                  value={project.short_name}
                  onChange={setShortName}
                />
                <FormHelperText>
                  All lowercase with dashes (used in URL)
                </FormHelperText>
              </FormControl>
              <FormControl my="1rem">
                <FormLabel>Year</FormLabel>
                <Input
                  type="year"
                  placeholder="Year"
                  value={project.year}
                  onChange={setYear}
                />
                <FormHelperText>Maximal 4 characters</FormHelperText>
              </FormControl>
            </Flex>
            <FormControl my="1rem">
              <FormLabel>Topic</FormLabel>
              <Input
                type="text"
                placeholder="Topic"
                value={project.topic}
                onChange={setTopic}
              />
            </FormControl>
            <FormControl my="1rem">
              <FormLabel>Link</FormLabel>
              <Input
                type="text"
                placeholder="Link"
                value={project.link}
                onChange={setLink}
              />
            </FormControl>
            <FormControl my="1rem">
              <FormLabel>Stack</FormLabel>
              <Input
                type="text"
                placeholder="Stack"
                value={project.stack}
                onChange={setStack}
              />
            </FormControl>
            <FormControl my="1rem">
              <FormLabel>Images</FormLabel>
              <Input
                type="text"
                placeholder="Images"
                value={project.images}
                onChange={setImages}
              />
              <FormHelperText>
                Public URLs of images, comma-separated (will be parsed into
                list)
              </FormHelperText>
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel>Description</FormLabel>
              <Textarea
                h="500px"
                placeholder="Description"
                value={project.desc}
                onChange={setDesc}
              />
            </FormControl>
          </>
        ) : (
          <ProjectTemplate project={project} />
        )}
        <Flex justifyContent="center">
          <Button
            isLoading={loading}
            loadingText="Saving..."
            variant="outline"
            w="100%"
            my="2rem"
            _hover={{ backgroundColor: "var(--markdown-accent)" }}
            onClick={submit}
          >
            Save
          </Button>
        </Flex>
      </PageBox>
    );
  } else {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height="50px">
          <TraceBack />
        </Flex>
        <ProjectTemplate project={project} />
      </PageBox>
    );
  }
};

export default Project;

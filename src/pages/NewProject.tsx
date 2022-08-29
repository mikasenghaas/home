// NewProject.tsx
// By: Mika Senghaas

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";
import options from "../lib/markdownOptions";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle";
import ProjectTemplate from "../components/ProjectTemplate"
import httpClient from "../httpClient";

// pages
import Unauthorised from "../pages/Unauthorised";

const NewProject = (props: any) => {
  const navigate = useNavigate();
  const { admin } = props.state;

  const [edit, setEdit] = useState(true);
  const [project, setProject] = useState({
    name: "",
    short_name: "",
    desc: "",
    year: "",
    topic: "",
    stack: "",
    link: "",
    images: '["/images/no-image.jpeg"]',
  });

  useEffect(() => {
    document.title = "New Project - Mika Senghaas";
  }, []);


  const submit = () => {
    const body = {
      name: project.name,
      short_name: project.short_name,
      desc: project.desc,
      year: project.year,
      topic: project.topic,
      stack: project.stack,
      link: project.link,
      images: project.images,
    };
    httpClient
      .post("/api/add_project", body)
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          projects: [...prev.projects, res.data.project],
          admin: false,
          message: res.data.msg,
        }));
        navigate("/projects");
      })
      .catch(() => {
        props.setState((prev: any) => ({
          ...prev,
          message: "Could not add project. Try again later.",
        }));
        navigate(-1);
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

  if (admin) {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center">
          <TraceBack />
          <EditorToggle edit={edit} toggleMode={toggleMode} admin={admin} />
        </Flex>
        {edit ? (
          <>
            <md.H1>New Project</md.H1>
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
                <FormHelperText>
                  Maximal 4 characters
                </FormHelperText>
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
                Public URLs of images, comma-separated (will be parsed into list)
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
    return <Unauthorised />;
  }
};

export default NewProject;

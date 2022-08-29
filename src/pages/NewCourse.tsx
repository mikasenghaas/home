// NewMaterial.tsx
// By: Mika Senghaas
// custom styles
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
import httpClient from "../httpClient";

// pages
import Unauthorised from "../pages/Unauthorised";

const NewCourse = (props: any) => {
  const navigate = useNavigate();
  const { admin } = props.state;

  const [edit, setEdit] = useState(true);
  const [doc, setDoc] = useState({
    id: "",
    name: "",
    short_name: "",
    professor: "",
    bio: "",
  });

  useEffect(() => {
    document.title = "New Course - Mika Senghaas";
  }, []);

  const toggleMode = () => {
    setEdit(!edit);
  };

  const setName = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const setShortName = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      short_name: e.target.value,
    }));
  };

  const setProfessor = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      professor: e.target.value,
    }));
  };

  const setBio = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const submit = () => {
    const body = {
      name: doc.name,
      short_name: doc.short_name,
      professor: doc.professor,
      bio: doc.bio,
    };
    httpClient.post("/api/add_course", body).then((res: any) => {
      navigate("/teaching");
      props.setState((prev: any) => ({
        ...prev,
        courses: [...prev.courses, res.data.course],
        admin: false,
        message: res.data.msg,
      }));
    });
  };

  if (admin) {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center">
          <TraceBack />
          <Flex alignItems="center" my="1rem">
            <md.Badge color={edit ? "var(--markdown-accent)" : "default"}>
              Editor
            </md.Badge>
            <Switch mx=".5rem" size="md" onChange={toggleMode} />
            <md.Badge color={!edit ? "var(--markdown-accent)" : "default"}>
              Preview
            </md.Badge>
          </Flex>
        </Flex>
        {edit ? (
          <>
            {!doc.id ? <md.H1>Add Course</md.H1> : <md.H1>Edit Course</md.H1>}
            <md.Divider />
            <FormControl my="1rem">
              <FormLabel>Title </FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={doc.name}
                onChange={setName}
              />
            </FormControl>
            <FormControl my="1rem">
              <FormLabel>Short Name</FormLabel>
              <Input
                type="text"
                placeholder="Short Name"
                value={doc.short_name}
                onChange={setShortName}
              />
              <FormHelperText>
                All lowercase with dashes (used in URL)
              </FormHelperText>
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel>Professor</FormLabel>
              <Input
                placeholder="Professor"
                value={doc.professor}
                onChange={setProfessor}
              />
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Bio (Markdown Format)"
                value={doc.bio}
                onChange={setBio}
              />
            </FormControl>
          </>
        ) : (
          <Markdown options={options}>{doc.bio}</Markdown>
        )}
        <Flex justifyContent="center">
          <Button
            variant="outline"
            w="100%"
            my="2rem"
            _hover={{ backgroundColor: "var(--markdown-accent)" }}
            onClick={submit}
          >
            Create
          </Button>
        </Flex>
      </PageBox>
    );
  } else {
    return <Unauthorised />;
  }
};

export default NewCourse;

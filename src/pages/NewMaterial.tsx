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
  Select,
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

const NewMaterial = (props: any) => {
  const navigate = useNavigate();
  const { courses, admin } = props.state;

  const [edit, setEdit] = useState(true);
  const [doc, setDoc] = useState({
    id: "",
    title: "",
    short_title: "",
    markdown: "",
    coursename: "",
  });

  useEffect(() => {
    document.title = "New Material - Mika Senghaas";
  }, []);

  const toggleMode = () => {
    setEdit(!edit);
  };

  const setTitle = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const setShortTitle = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      short_title: e.target.value,
    }));
  };

  const setCoursename = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      coursename: e.target.value,
    }));
  };

  const setMarkdown = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      markdown: e.target.value,
    }));
  };

  const submit = () => {
    const body = {
      title: doc.title,
      short_title: doc.short_title,
      coursename: doc.coursename,
      markdown: doc.markdown,
    };
    console.log(body);
    httpClient.post("/api/add_material", body).then((res: any) => {
      props.setState((prev: any) => ({
        ...prev,
        admin: false,
        material: [...prev.material, res.data.material],
        message: res.data.msg,
      }));
      navigate(-1);
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
            {!doc.id ? (
              <md.H1>Add Material</md.H1>
            ) : (
              <md.H1>Edit Material</md.H1>
            )}
            <md.Divider />
            <FormControl my="1rem">
              <FormLabel>Title </FormLabel>
              <Input
                type="text"
                placeholder="Title"
                value={doc.title}
                onChange={setTitle}
              />
            </FormControl>
            <Flex alignItems="flex-start">
              <FormControl my="1rem">
                <FormLabel>Short Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Short Title"
                  value={doc.short_title}
                  onChange={setShortTitle}
                />
                <FormHelperText>
                  All lowercase with dashes (used in URL)
                </FormHelperText>
              </FormControl>
              <FormControl my="1rem">
                <FormLabel>Course</FormLabel>
                <Select
                  defaultValue="Machine Learning"
                  value={doc.coursename}
                  onChange={setCoursename}
                >
                  {courses.map((course: any, i: number) => {
                    return (
                      <option key={i} value={course.name}>
                        {course.name}
                      </option>
                    );
                  })}
                </Select>
                <FormHelperText>Select course</FormHelperText>
              </FormControl>
            </Flex>
            <FormControl mt="1rem">
              <FormLabel>Markdown</FormLabel>
              <Textarea
                h="500px"
                placeholder="Markdown"
                value={doc.markdown}
                onChange={setMarkdown}
              />
            </FormControl>
          </>
        ) : (
          <Markdown options={options}>{doc.markdown}</Markdown>
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

export default NewMaterial;

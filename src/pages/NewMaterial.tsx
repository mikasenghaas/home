// NewMaterial.tsx
// By: Mika Senghaas
// custom styles
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import Markdown from "../components/Markdown";
import httpClient from "../httpClient";

// pages
import Unauthorised from "../pages/Unauthorised";

const NewMaterial = (props: any) => {
  const navigate = useNavigate();
  const { course_short } = useParams();
  const { courses, admin } = props.state;

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [doc, setDoc] = useState({
    id: "",
    name: "",
    short_name: "",
    markdown: "",
    course_short: course_short,
  });

  useEffect(() => {
    document.title = "New Material - Mika Senghaas";
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

  const setCoursename = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      course_short: e.target.value,
    }));
  };

  const setMarkdown = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      markdown: e.target.value,
    }));
  };

  const submit = () => {
    setLoading(true);
    const body = {
      name: doc.name,
      short_name: doc.short_name,
      course_short: doc.course_short,
      markdown: doc.markdown,
    };
    httpClient
      .post("/api/add_material", body)
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          admin: false,
          material: [...prev.material, res.data.material],
          message: res.data.msg,
        }));
        setLoading(false);
        navigate(-1);
      })
      .catch(() => {
        props.setState((prev: any) => ({
          ...prev,
          message: "Could not add material. Try again later.",
        }));
        setLoading(false);
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
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={doc.name}
                onChange={setName}
              />
            </FormControl>
            <Flex alignItems="flex-start">
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
              <FormControl my="1rem">
                <FormLabel>Course</FormLabel>
                <Select value={doc.course_short} onChange={setCoursename}>
                  {courses.map((course: any, i: number) => {
                    return (
                      <option key={i} value={course.short_name}>
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
          <Markdown>{doc.markdown}</Markdown>
        )}
        <Flex justifyContent="center">
          <Button
            isLoading={loading}
            loadingText="Adding Material..."
            variant="outline"
            w="100%"
            my="2rem"
            _hover={{ backgroundColor: "var(--markdown-accent)" }}
            onClick={submit}
          >
            Add Material
          </Button>
        </Flex>
      </PageBox>
    );
  } else {
    return <Unauthorised />;
  }
};

export default NewMaterial;

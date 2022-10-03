// Material.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Textarea,
} from "@chakra-ui/react";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom pages
import NotFound from "../pages/NotFound";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle";
import Markdown from "../components/Markdown";
import Loading from "../components/Loading";
import httpClient from "../httpClient";

const Material = (props: any) => {
  const { course_short, material_short } = useParams();
  const { courses, material, loading_material, admin } = props.state;

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [doc, setDoc] = useState({
    id: "",
    name: "",
    short_name: "",
    markdown: "",
    course_short: course_short,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    /* search for material through requested url route */
    if (!loading_material) {
      const current_course = courses.find((c: any) => c.short_name === course_short);
      const current_material = material.find(
        (m: any) => m.short_name === material_short && m.cid === current_course.id
      );

      if (current_material) {
        setDoc({
          ...doc,
          ...current_material
        });

        document.title = `${current_material.name} - Mika Senghaas`;
      }
    }
  }, [courses, material]);

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
    httpClient
      .post("/api/edit_material", {
        ...doc,
        password: process.env.REACT_APP_ADMIN_PASSWORD,
      })
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          admin: false,
          material: [...prev.material, res.data.material],
          message: res.data.msg,
        }));
        setLoading(false);
      })
      .catch(() => {
        props.setState((prev: any) => ({
          ...prev,
          message: "Could not edit material. Try again later.",
        }));
        setLoading(false);
      });
  };

  if (props.state.loading) {
    return <Loading />;
  } else if (!doc.id) {
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
            <md.H1>Edit Material</md.H1>
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
                value={doc.name}
                onChange={setName}
              />
            </FormControl>
            <Flex alignItems="center">
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
        <Markdown>{doc.markdown}</Markdown>
      </PageBox>
    );
  }
};

export default Material;

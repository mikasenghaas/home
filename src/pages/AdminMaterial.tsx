// AdminMaterial.tsx
// By: Mika Senghaas
// custom styles
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

const AdminMaterial = (props: any) => {
  const { material_id } = useParams();
  const { courses, material, admin } = props.state;

  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState({
    id: "",
    title: "",
    short_title: "",
    markdown: "",
    coursename: "",
  });

  useEffect(() => {
    const edit_material = material.find((m: any) => m.id === material_id);

    if (edit_material) {
      const course = courses.find((c: any) => c.id === edit_material.cid);

      setDoc({
        id: edit_material.id,
        title: edit_material.title,
        short_title: edit_material.short_title,
        markdown: edit_material.markdown,
        coursename: course.name,
      });
    }
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
    if (!doc.id) {
      const body = {
        title: doc.title,
        short_title: doc.short_title,
        coursename: doc.coursename,
        markdown: doc.markdown,
      };
      httpClient
        .post("/api/add_material", body)
        .then((res: any) => console.log(res));
    } else {
      httpClient
        .post("/api/edit_material", doc)
        .then((res: any) => console.log(res));
    }
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
            <md.P>
              Create new or edit existing material using markdown style. Use the
              input fields, switch to preview mode and hit save if you are happy
              with your changes.
            </md.P>
            <FormControl my="1rem">
              <FormLabel>Title </FormLabel>
              <Input
                type="text"
                placeholder="Title"
                value={doc.title}
                onChange={setTitle}
              />
            </FormControl>
            <Flex alignItems="center">
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
                  defaultValue={doc.coursename}
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
            isLoading={loading}
            loadingText="Submitting"
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

export default AdminMaterial;

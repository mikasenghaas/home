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
  Switch,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";
import options from "../lib/markdownOptions";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle"
import httpClient from "../httpClient";
import NotFound from "../pages/NotFound"

const Material = (props: any) => {
  const { course_short, material_name } = useParams();
  const { courses, material, admin } = props.state;

  const [edit, setEdit] = useState(false);
  const [doc, setDoc] = useState({
    id: "",
    title: "",
    short_title: "",
    markdown: "",
    coursename: "",
  });

  useEffect(() => {
    const edit_course = courses.find((c: any) => c.short_name === course_short);
    const edit_material = material.find((m: any) => m.short_title === material_name && m.cid === edit_course.id);

    if (edit_material) {
      setDoc({
        id: edit_material.id,
        title: edit_material.title,
        short_title: edit_material.short_title,
        markdown: edit_material.markdown,
        coursename: edit_course.name,
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
    httpClient
      .post("/api/edit_material", doc)
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          admin: false,
          message: "Successfully edited material"
        }))
      });
  };

  if (!doc.id) {
    return <NotFound />
  } else if (admin) {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height='50px'>
          <TraceBack />
          <EditorToggle edit={edit} toggleMode={toggleMode} admin={admin} />
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
        <Flex justifyContent="space-between" alignItems="center" height='50px'>
          <TraceBack />
        </Flex>
        <Markdown options={options}>{doc.markdown}</Markdown>
      </PageBox>
    )
  }
}


export default Material;

// Course.tsx
// By: Mika Senghaas

import { useState, useEffect } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";
import options from "../lib/markdownOptions";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import MaterialBox from "../components/MaterialBox";
import EditorToggle from "../components/EditorToggle";
import NotFound from "../pages/NotFound";
import httpClient from "../httpClient";

const Course = (props: any) => {
  const navigate = useNavigate();
  const { course_short } = useParams();
  const { courses, material, loadingMaterial, admin } = props.state;

  const [edit, setEdit] = useState(false);
  const [course, setCourse] = useState({
    id: "",
    name: "",
    short_name: "",
    professor: "",
    bio: "",
  });
  const [courseMaterial, setCourseMaterial] = useState([]);

  useEffect(() => {
    document.title = 'teaching@jonas-mika'
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!loadingMaterial) {
      const c = courses.find((c: any) => c.short_name === course_short);
      if (c) { setCourse(c) };
    }
  }, [props.state]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (material && course.name) {
      const cm = material.filter((m: any) => m.cid === course.id);
      setCourseMaterial(cm);
    }
  }, [course]);

  const toggleMode = () => {
    setEdit(!edit);
  };

  const setName = (e: any) => {
    setCourse((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const setShortName = (e: any) => {
    setCourse((prev) => ({
      ...prev,
      short_name: e.target.value,
    }));
  };

  const setProfessor = (e: any) => {
    setCourse((prev) => ({
      ...prev,
      professor: e.target.value,
    }));
  };

  const setBio = (e: any) => {
    setCourse((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const submit = () => {
    httpClient.post("/api/edit_course", course).then((res: any) => {
      props.setState((prev: any) => ({
        ...prev,
        admin: false,
        message: 'Sucessfully edited course.'
      }));
    });
  };

  const order = (a: any, b: any) =>  {
    const dateA = Date.parse(a['created'])
    const dateB = Date.parse(b['created'])
    return dateA > dateB ? -1 : (dateA < dateB ? 1 : 0);
  }
  
  if (!course.id) {
    return <NotFound />
  } else if (admin) {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height='50px'>
          <TraceBack />
          <EditorToggle edit={edit} toggleMode={toggleMode} admin={admin}/>
        </Flex>
        {edit ? (
          <>
            <md.H1>Edit Course</md.H1>
            <md.Divider />
            <FormControl my="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={course.name}
                onChange={setName}
              />
            </FormControl>
            <FormControl my="1rem">
              <FormLabel>Short Name</FormLabel>
              <Input
                type="text"
                placeholder="Short Name"
                value={course.short_name}
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
                value={course.professor}
                onChange={setProfessor}
              />
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Bio (Markdown Format)"
                value={course.bio}
                onChange={setBio}
              />
            </FormControl>
            <Button
              variant="outline"
              w="100%"
              my="2rem"
              _hover={{ backgroundColor: "var(--markdown-accent)" }}
              onClick={submit}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Markdown options={options}>{course.bio}</Markdown>
        )}
        {!loadingMaterial && (
          <>
            <md.H2 mt="2.5rem">Material</md.H2>
            <md.Divider />
            <Button
              variant="outline"
              w="100%"
              my=".5rem"
              _hover={{ backgroundColor: "var(--markdown-accent)" }}
              onClick={() => navigate("new-material")}
            >
              Add Material
            </Button>
            {courseMaterial.sort(order).map((material: any, i: number) => {
              return <MaterialBox key={i} material={material} />;
            })}
          </>
        )}
      </PageBox>
    );
  } else {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height='50px'>
          <TraceBack />
        </Flex>
        {!loadingMaterial && (
          <>
            <Markdown options={options}>{course.bio}</Markdown>
            <md.H2 mt="2.5rem">Material</md.H2>
            <md.Divider />
            {courseMaterial.sort(order).map((material: any, i: number) => {
              return <MaterialBox key={i} material={material} />;
            })}
          </>
        )}
      </PageBox>
    );
  }
};

export default Course;

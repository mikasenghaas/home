// CourseBox.tsx
// By: Mika Senghaas

import { useState, useRef } from "react";
import {
  Flex,
  Button,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

// custom styles
import * as md from "../styles/MarkdownStyles";
import httpClient from "../httpClient";

const CourseBox = (props) => {
  const { course, admin } = props;

  // states, refs
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const submit = () => {
    setLoading(true);
    httpClient
      .post("/api/delete_course", {
        id: course.id,
        password: process.env.REACT_APP_ADMIN_PASSWORD,
      })
      .then((res) => {
        props.setState((prev) => ({
          ...prev,
          courses: prev.courses.filter((c) => c.id !== course.id),
          message: res.data.msg,
        }));
        setLoading(false);
        onClose();
      })
      .catch(() => {
        props.setState((prev) => ({
          ...prev,
          message: "Could not delete course. Try again later.",
        }));
        setLoading(false);
        onClose();
      });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="5px"
      borderRadius="10px"
      height="120px"
      _hover={{ backgroundColor: "var(--markdown-code-bg)" }}
      transition=".2s ease-in-out"
      border="2px solid var(--markdown-code-bg)"
    >
      <RouterLink
        to={`/teaching/${course.short_name}`}
        style={{ textDecoration: "none" }}
        role="group"
      >
        <Flex
          px="20px"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <md.P>📙</md.P>
          <md.H3
            mt={0}
            textAlign="center"
            _hover={{ textDecoration: "underline" }}
            noOfLines={1}
          >
            {course.name}
          </md.H3>
        </Flex>
        <Flex justifyContent="center">
          <md.Badge>{course.semester}</md.Badge>
        </Flex>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent bgColor="var(--markdown-code-bg)">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Course
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete {course.name}?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button variant="outline" ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={loading}
                  loadingText="Deleting..."
                  variant="outline"
                  _hover={{ bgColor: "var(--markdown-accent)" }}
                  onClick={submit}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </RouterLink>
      {admin && (
        <Button onClick={onOpen}>
          <BiTrash />
        </Button>
      )}
    </Flex>
  );
};

export default CourseBox;

// CourseBox.tsx
// By: Mika Senghaas

import { useRef } from "react";
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
  const { course } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteCourse = () => {
    console.log("deleted");
    /*
    httpClient.post('/api/delete_course', { id: course.id })
      .then(res => console.log(res.data))
    */
  };

  return (
    <RouterLink
      to={course.short_name}
      style={{ textDecoration: "none" }}
      role="group"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p="5px"
        _groupHover={{ backgroundColor: "var(--markdown-code-bg)" }}
      >
        <Flex>
          <md.P>📙</md.P>
          <md.P
            ml="10px"
            color="var(--markdown-link)"
            _hover={{ textDecoration: "underline" }}
          >
            {course.name}
          </md.P>
        </Flex>
        {props.admin && (
          <Button onClick={onOpen}>
            <BiTrash />
          </Button>
        )}
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </RouterLink>
  );
};

export default CourseBox;

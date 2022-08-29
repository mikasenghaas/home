// MaterialBox.tsx
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

const MaterialBox = (props) => {
  const { material, admin } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteMaterial = () => {
    httpClient.post("/api/delete_material", { id: material.id }).then((res) => {
      props.setState((prev) => ({
        ...prev,
        material: prev.material.filter((m) => m.id !== material.id),
        admin: false,
        message: "Material successfully deleted",
      }));
    });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="50"
      p="5px"
      borderRadius="10px"
      _hover={{ backgroundColor: "var(--markdown-code-bg)" }}
    >
      <RouterLink
        to={material.short_title}
        style={{ textDecoration: "none" }}
        role="group"
      >
        <Flex alignItems="center">
          <md.P>🖇</md.P>
          <Flex ml="10px" direction="column">
            <md.P
              color="var(--markdown-link)"
              _hover={{ textDecoration: "underline" }}
              m={0}
            >
              {material.title}
            </md.P>
            <md.P m={0} fontSize="7px" color="var(--markdown-text-fg)">
              Last edited:{" "}
              {new Date(Date.parse(material.last_edited) + 2 * 60 * 60 * 1000)
                .toGMTString()
                .split(" ")
                .slice(1, 5)
                .join(" ")}
            </md.P>
          </Flex>
        </Flex>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent bgColor="var(--markdown-code-bg)">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Material
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button variant="outline" ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  _hover={{ bgColor: "var(--markdown-accent)" }}
                  onClick={() => {
                    deleteMaterial();
                    onClose();
                  }}
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

export default MaterialBox;

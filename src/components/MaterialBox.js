// MaterialBox.tsx
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

// helpers
import { timeSince } from "../lib/helpers";

const MaterialBox = (props) => {
  const { material, admin } = props;
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const submit = () => {
    setLoading(true);
    httpClient
      .post("/api/delete_material", { id: material.id })
      .then((res) => {
        props.setState((prev) => ({
          ...prev,
          material: prev.material.filter((m) => m.id !== material.id),
          message: res.data.msg,
        }));
        setLoading(false);
        onClose();
      })
      .catch(() => {
        props.setState((prev) => ({
          ...prev,
          message: "Could not delete material. Try again later.",
        }));
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        height="60px"
        p="10px 10px 10px 20px"
        borderRadius="10px"
        border="2px solid var(--markdown-code-bg)"
        my={2}
        _hover={{ backgroundColor: "var(--markdown-code-bg)" }}
        transition=".2s ease-in-out"
      >
        <Flex
          as={RouterLink}
          _hover={{ textDecoration: "none" }}
          height="100%"
          to={material.short_name}
          alignItems="center"
          flex={1}
        >
          <md.P _hover={{ textDecoration: "none" }}>🖇</md.P>
          <Flex ml="10px" direction="column">
            <md.H4 m={0}>{material.name}</md.H4>
            <md.P
              m={0}
              fontSize="7px"
              color="var(--markdown-text-fg)"
              _groupHover={{ textDecoration: "none" }}
            >
              Last edited:{" "}
              {timeSince(new Date(Date.parse(material.last_edited)))}
              {" "} ago
            </md.P>
          </Flex>
        </Flex>
        {admin && (
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
          <AlertDialogContent bgColor="var(--markdown-code-bg)">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Material
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to deleted {material.name}?
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
    </>
  );
};

export default MaterialBox;

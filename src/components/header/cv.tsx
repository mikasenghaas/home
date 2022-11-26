import { Tooltip, Button, Link } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

export default function CV() {
  return (
    <Tooltip label="CV">
      <Button as={Link} width="40px" height="40px" variant="custom" href="/assets/cv.pdf" isExternal>
        <AttachmentIcon />
      </Button>
    </Tooltip>
  );
}

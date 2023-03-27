import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { relative } from "path";
import React, { useState } from "react";
type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [CommunityName, setCommunityName] = useState("");
  const [charsRemaning, setCharsRemainig] = useState(21);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemainig(21 - event.target.value.length);
  };
  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={"flex"}
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a Community
        </ModalHeader>
        <Box pl={3} pr={3}>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection="column"
            padding={"10px 0 px"}
          >
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>
            <Text
              position={"relative"}
              top="28px"
              left={"10px"}
              width="20px"
              color={"gray.400"}
            >
              r/
            </Text>
            <Input
              position={"relative"}
              value={CommunityName}
              size="sm"
              pl={"22px"}
              onChange={ handleChange}
            />
            <Text color={charsRemaning ===0 ? "red":"gray.500"}>{charsRemaning}Characters remaining</Text>
          </ModalBody>
        </Box>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost">Create Community</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

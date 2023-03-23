import { Button, Flex ,Image } from "@chakra-ui/react";
import React from "react";

export const OAuthButtons: React.FC = () => {
  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button variant='oauth' mb={2}><Image height="20px" mr={4} src="./images/googlelogo.png"/> Continue with Google</Button>
      <Button variant='oauth' mb={2} >Some Other </Button>
    </Flex>
  );
};

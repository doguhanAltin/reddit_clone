import { auth } from "@/src/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { type } from "os";
import React from "react";
import { AuthButtons } from "./AuthButtons";
type RightContentProps = {
  user: any
};
export const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <Flex justify="center" align="center">
        {user ?<Button onClick={()=>signOut(auth)}>Sign Out</Button>: <AuthButtons />}
      </Flex>
    </>
  );
};

import { auth } from "@/src/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { type } from "os";
import React from "react";
import { AuthButtons } from "./AuthButtons";
import { Icons } from "./Icons";
import { UserMenu } from "./UserMenu";
type RightContentProps = {
  user?: User | null;
};
export const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
      </Flex>
      <UserMenu user={user} />
      
    </>
  );
};

import { authModalState } from "@/src/atoms/authModaAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { Login } from "./Login";
import { SıgnUp } from "./SıgnUp";

export const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalState.view === "login" && <Login /> }
      {modalState.view === "signup" && <SıgnUp />}
    </Flex>
  );
};

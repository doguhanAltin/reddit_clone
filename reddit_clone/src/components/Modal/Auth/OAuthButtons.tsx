import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Image,Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export const OAuthButtons: React.FC = () => {
  // #region Variables
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  // #endregion

  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image height="20px" mr={4} src="./images/googlelogo.png" /> Continue
        with Google
      </Button>
      <Button variant="oauth" mb={2}>
        Some Other{" "}
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

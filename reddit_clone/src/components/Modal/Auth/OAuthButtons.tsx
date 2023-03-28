import { auth, firestore } from "@/src/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export const OAuthButtons: React.FC = () => {
  // #region Variables
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  // #endregion
  // #region Funcitons
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };
  // #endregion


  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() =>
          signInWithGoogle().then((user) =>
            createUserDocument(user?.user as User)
          )
        }
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

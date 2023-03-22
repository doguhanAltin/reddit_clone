import React from "react";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";

type SearchInputProps = {};

export const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex grow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents={"none"} children={<SearchIcon  color="gray.400" mb={1}/>} />
        <Input
          type="string"
          placeholder="Search Reddit"
          fontSize="10pt"
          _hover={{
            bg: "white",
            border: "1 px solid ",
            borderColor: "blue.500",
          }}
          _placeholder={{ color: "gray.500" }}
          _focus = {{
            outline:"none",
            border:"1px solid",
            borderColor:"blue.500"
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};

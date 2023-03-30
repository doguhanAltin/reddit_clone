import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import { TabItem } from "./TabItem";
import { TextInputs } from "./PostForm/TextInputs";

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const formTabs: Array<TabItemType> = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];
export const NewPostForm: React.FC = () => {
  // #region states
  const [selectTab, setSelectTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading,setLoading] = useState(false)

  // #endregion

  // #region functions
  const handleCreatePost = async () => {};
  const onSelectImage = () => {};
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };
  // #endregion
  return (
    <Flex direction={"column"} bg="white" borderRadius={4} mt={2}>
      <Flex width={"100%"}>
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={item.title === selectTab}
            setSelectedTab={setSelectTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
      </Flex>
    </Flex>
  );
};

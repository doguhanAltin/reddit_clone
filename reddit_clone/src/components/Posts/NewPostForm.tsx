import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import { TabItem } from "./TabItem";
import { TextInputs } from "./PostForm/TextInputs";
import { ImageUpload } from "./PostForm/ImageUpload";
import { Post } from "@/src/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSelectFile } from "@/src/hooks/useSelectFile";

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};
type NewPostFormType = {
  user: User;
  communityImageURL?:string
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
export const NewPostForm: React.FC<NewPostFormType> = ({ user,communityImageURL }) => {
  // #region states
  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();
  const router = useRouter();
  const [selectTab, setSelectTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  // const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // #endregion

  // #region functions
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL:communityImageURL||"",
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      // strore the post in db

      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check  for selectedFile
      //update post doc add ımageUrl
      // redirect the user back
      if (selectedFile) {
        //store in storage => getDownUrl( retrun imageurl )

        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, `data_url`);
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        });
      }
      router.back();
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
  };

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
            key={item.title}
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
        {selectTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedTab={setSelectTab}
            onSelectImage={onSelectFile}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error} </AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

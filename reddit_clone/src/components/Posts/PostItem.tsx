import { Post } from "@/src/atoms/postsAtom";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import moment from "moment";
import React, { useState } from "react";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

export const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed delete");
      }
      console.log("Post deleted");
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };
  return (
    <Flex
      border={"1px solid"}
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction={"column"}
        align={"center"}
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.200" : "gray.400"}
          fontSize={22}
          onClick={onVote}
        />
        <Text fontSize={"9pt"}>{post.voteStatus} </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={onVote}
        />
      </Flex>
      <Flex direction={"column"} width="100%">
        <Stack spacing={1} p="10px">
          <Stack
            direction={"row"}
            spacing={0.6}
            align="center"
            fontSize={"9pt"}
          >
            {/* Hompage Check*/}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageUrl && (
            <Flex justify={"center"} align="center" p={2}>
              {loadingImage && (
                <Skeleton height={"200px"} width="100%" borderRadius={"4"} />
              )}
              <Image
                src={post.imageUrl}
                maxHeight="460px"
                alt="Post Image"
                display={loadingImage ? "none" : ""}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
          </Flex>

          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={"9pt"}>Share</Text>
          </Flex>

          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={"9pt"}>Save</Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={"9pt"}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

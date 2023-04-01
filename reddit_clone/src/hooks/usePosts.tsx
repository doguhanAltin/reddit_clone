import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";
import { Post, PostState } from "../atoms/postsAtom";
import { firestore, storage } from "../firebase/clientApp";

export const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(PostState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      //check Image
      if (post.imageUrl) {
        const ImageRef = ref(storage, `post/${post.id}/image`);
        await deleteObject(ImageRef);
      }

      //delete post
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      //update recoil
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { PageContent } from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../atoms/postsAtom";
import { PostLoader } from "../components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import { PostItem } from "../components/Posts/PostItem";
import { CreatePostLink } from "../components/Community/CreatePostLink";
import { communityState } from "../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);
  //#region Func
  const buildUserHomeFeed = async () => {
    // get posts from users' comm
    setLoading(true);
    try {
      // get posts from users's comm
      if (communityStateValue.mySnippets.length) {
        // get posts from users' communites
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
          
        }));
      } else {
        buildNoUserFeed();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const buildNoUserFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUserPostVoted = () => {};
  //#endregion
  //#region useEffect
  useEffect(() => {
    if (!user && !loadingUser) buildNoUserFeed();
  }, [user, loadingUser]);

  useEffect(()=>{
    if(communityStateValue.mySnippets.length) buildUserHomeFeed();

  },[communityStateValue.snippetsFetched])
  //#endregion

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>Recco</>
    </PageContent>
  );
}

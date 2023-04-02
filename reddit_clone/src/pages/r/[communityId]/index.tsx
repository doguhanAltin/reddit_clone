import { Community, communityState } from "@/src/atoms/communitiesAtom";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import React, { useEffect } from "react";
import { CommunityNotFound } from "@/src/components/Community/NotFound";
import { Header } from "@/src/components/Community/Header";
import { PageContent } from "@/src/components/Layout/PageContent";
import { CreatePostLink } from "@/src/components/Community/CreatePostLink";
import { Posts } from "@/src/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import { About } from "@/src/components/Community/About";
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  if (!communityData) {
    return <CommunityNotFound />;
  }
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // Could create error page here
    console.log(error);
  }
}
export default CommunityPage;

import { Flex } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import router, { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { Layout, ProfileTabs, UpperProfile } from "../../components";
import useAuth, { IUser } from "../../context/Auth/Auth";
// eslint-disable-next-line max-len
import { getUserFromUsername } from "../../utils/Firestore/user/getUserFromUsername";
import { getUserNfts } from "../../utils/Firestore/nft/getUserNfts";
import { INFT } from "../../utils/Firestore/nft/addNfts";
// eslint-disable-next-line max-len
import { likeHandler } from "../../utils/like/likeHandler";
import { isLiked } from "../../utils/like/isLiked";
import { INITIAL_NFT_STATE, nftReducer } from "./reducer/nftReducer";

import {
  INITIAL_LAST_DOC_STATE,
  lastDocReducer,
} from "./reducer/lastDocReducer";

const LIMIT = 8;

function Profile(): JSX.Element {
  const { isLoading, isAuthenticated, user, authDispatch } = useAuth();
  const { query, isReady } = useRouter();
  const toast = useToast();
  const [userDetails, setUserDetails] = useState<IUser>();

  const [lastNftDocState, lastNftDocDispatch] = useReducer(
    lastDocReducer,
    INITIAL_LAST_DOC_STATE
  );

  const [nftState, nftDispatch] = useReducer(nftReducer, INITIAL_NFT_STATE);

  const [pageNo, setPageNo] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchUserNfts = useCallback(
    async (
      limit: number,
      userUid?: string,
      lastDocFound?: any
    ): Promise<void> => {
      if (!userUid) return;

      // setMiniLoader(true);
      nftDispatch({ type: "SET_LOADING" });

      const resNfts = await getUserNfts(
        limit,
        "likes",
        "desc",
        userUid,
        lastDocFound
      );

      if (resNfts?.success) {
        nftDispatch({
          type: "SET_NFTS",
          payload: resNfts?.nftRes || [],
        });
        if (resNfts?.total !== undefined && resNfts?.total < LIMIT) {
          nftDispatch({ type: "SET_HAS_MORE", payload: false });
        }
        if (resNfts?.lastDoc) {
          lastNftDocDispatch({
            type: "SET_LAST_DOC",
            payload: {
              collectionName: "nfts",
              lastDoc: resNfts.lastDoc,
            },
          });
        }
      } else {
        toast({
          title: "Error",
          description: resNfts?.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isReady) {
      nftDispatch({
        type: "RESET",
      });
      // setAllNftsAreLoaded(false);
      nftDispatch({ type: "SET_HAS_MORE", payload: true });
    }
  }, [query.username, isReady]);

  useEffect(() => {
    if (!isLoading && isReady && query.username !== user?.username) {
      const fetchUser = async () => {
        const username = query.username as string;
        const response = await getUserFromUsername(username);
        if (response?.success && response?.user) {
          const resUser = response.user;
          if (!resUser?.coverImageURL) {
            resUser.coverImageURL = "/images/coverInitial.png";
          }
          setUserDetails(resUser);
        } else {
          toast({
            title: "User not found",
            description: "The user you are looking for does not exist",
            status: "error",
            duration: 3000,
            isClosable: true,
            variant: "left-accent",
          });
          router.push(`/auth/login`);
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query.username, user?.uid, isLoading]);

  // useEffect(() => {
  //   if (isReady && userDetails?.uid && !miniLoader) {
  //     fetchUserNfts(LIMIT, userDetails?.uid, lastNftDoc);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isReady, userDetails?.uid]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (nftState?.hasMore) {
      const belowContentElement = document.getElementsByClassName(
        "flex-layout-container"
      )[0];
      const handleScroll = async () => {
        if (belowContentElement) {
          const fixedHeightFromTop = Math.ceil(
            belowContentElement.getBoundingClientRect().height
          );
          const fixedHeightOfContainer = belowContentElement.scrollHeight;
          const currentScrollPostition = belowContentElement.scrollTop;
          if (
            currentScrollPostition >=
            fixedHeightOfContainer - fixedHeightFromTop
          ) {
            if (!nftState?.loading) {
              setPageNo((prev) => prev + 1);
              // console.log("fetching", !miniLoader);
            }
            // console.log("fetching bolna", !miniLoader, miniLoader);
          }
        }
      };
      belowContentElement.addEventListener("scroll", handleScroll);
      return () => {
        belowContentElement.removeEventListener("scroll", handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady && tabIndex === 0) {
      const currentUserUid =
        query.username !== user?.username ? userDetails?.uid : user?.uid;
      if (nftState?.hasMore && !nftState?.loading && currentUserUid) {
        (async () =>
          fetchUserNfts(LIMIT, currentUserUid, lastNftDocState.nfts))();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageNo,
    isReady,
    query?.username,
    user?.username,
    user?.uid,
    userDetails?.uid,
  ]);

  const currentUser = query.username !== user?.username ? userDetails : user;

  const isLikedCheck = (nftId?: string, userId?: string) => {
    if (!nftId || !userId) return false;
    if (user?.uid) {
      const nft = nftState.nfts.find((nftItem: INFT) => nftItem.uid === nftId);
      if (nft?.likes) {
        return isLiked(userId, nft);
      }
    }
    return false;
  };

  return (
    <Layout title="Profile" expandedNav={!isLoading && isAuthenticated}>
      <Flex flexDir="column" w="full" h="full" align="center" pos="relative">
        <UpperProfile
          isCurrentUserProfile={query.username === user?.username}
          isLoading={isLoading || !isReady}
          user={currentUser}
        />
        <ProfileTabs
          user={user}
          isLoading={isLoading || nftState?.loading}
          nfts={nftState.nfts}
          setTabIndex={setTabIndex}
          nftDispatch={nftDispatch}
          isLikedCheck={isLikedCheck}
        />

        <Flex
          w="full"
          justify="center"
          align="center"
          py={8}
          pb="4rem"
          opacity={nftState?.loading ? 1 : 0}
        >
          <Spinner size="xl" />
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Profile;

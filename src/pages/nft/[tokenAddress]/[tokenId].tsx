/* eslint-disable max-len */
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Stack, Divider } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import {
  Comments,
  Layout,
  Loader,
  NftContainer,
  NftFooter,
  NftHeader,
  NftImageViewer,
  NftInfo,
} from "../../../components";
import useAuth, { IUser } from "../../../context/Auth/Auth";
import { WithAuth } from "../../../HOC/WithAuth";
import { INFT } from "../../../utils/Firestore/nft/addNfts";
import {
  addComment,
  IComment,
} from "../../../utils/Firestore/nft/comment/addComment";
import { getComments } from "../../../utils/Firestore/nft/comment/getComments";
import { getNFTFromTokenAddress } from "../../../utils/Firestore/nft/getNFTFromTokenAddress";
import { generatePinataLink } from "../../../utils/generatePinataLink";
import { getIpfsLink } from "../../../utils/getIPFSLink";
import { isLiked } from "../../../utils/like/isLiked";
import { likeHandler } from "../../../utils/like/likeHandler";
import { pinNFTHandler } from "../../../utils/pinNFTHandler";

interface IInitialCommentState {
  comments: IComment[];
  loading: boolean;
}

const INITIAL_COMMENTS_STATE: IInitialCommentState = {
  comments: [],
  loading: false,
};

function commentReducer(state: IInitialCommentState, action: any) {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.comments,
        loading: false,
      };
    case "ADD_COMMENT":
      return {
        comments: [action.comment, ...state.comments],
        loading: false,
      };
    case "SET_LOADING":
      return {
        comments: state.comments,
        loading: true,
      };
    default:
      return state;
  }
}

function NFT(): JSX.Element {
  const { query, isReady } = useRouter();
  const { user, authDispatch } = useAuth();
  const toast = useToast();
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    INITIAL_COMMENTS_STATE
  );
  const [nftDetails, setNftDetails] = useState<INFT | null>(null);
  const [imageDetails, setImageDetails] = useState({
    height: 0,
    width: 0,
  });

  const fetchComments = async (commentIds: string[]) => {
    commentDispatch({ type: "SET_LOADING" });
    const commentRes = await getComments(commentIds);
    if (commentRes?.success) {
      commentDispatch({ type: "SET_COMMENTS", comments: commentRes.comments });
    } else {
      toast({
        title: "Error",
        description: commentRes?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  };

  const commentCallback = async (comment: string) => {
    if (!comment) return;
    if (nftDetails?.uid && user?.uid) {
      const commentRes = await addComment(nftDetails.uid, comment, user?.uid);
      if (commentRes?.success) {
        commentDispatch({
          type: "ADD_COMMENT",
          comment: { ...commentRes.comment, user },
        });
        toast({
          title: "Commented Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
        });
      } else {
        toast({
          title: "Error Commenting",
          status: "error",
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
        });
      }
    } else {
      toast({
        title: "Please Login to Comment",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  };

  const nftFooterLinks = [
    {
      label: "OpenSea",
      href: `https://opensea.io/assets/${nftDetails?.tokenAddress}/${nftDetails?.tokenId}`,
    },
    {
      label: "Rarible",
      href: `https://rarible.com/token/${nftDetails?.tokenAddress}:${nftDetails?.tokenId}`,
    },
    {
      label: "Etherscan",
      href: `https://etherscan.io/address/${nftDetails?.tokenAddress}`,
    },
  ];

  const isCurrentUser = user?.uid === (nftDetails?.owner as IUser)?.uid;

  useEffect(() => {
    if (isReady && query.tokenAddress && query.tokenId) {
      (async () => {
        const res = await getNFTFromTokenAddress(
          query?.tokenAddress?.toString() || "",
          query?.tokenId?.toString() || ""
        );

        if (res?.success && res?.nft) {
          setNftDetails(res.nft);
          // fetch comments
          fetchComments(res?.nft?.comments || []);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query.tokenAddress, query.tokenId]);

  const bg = useColorModeValue("gray.100", "gray.900");

  if (typeof nftDetails?.owner === "string") {
    return <Loader />;
  }

  return (
    <Layout title="NFT" expandedNav>
      <Flex
        py={{
          base: "0rem",
          md: 20,
        }}
        w="full"
        // h="full"
        bg={bg}
        justify="center"
        align="center"
        flexDir="column"
        mb="1.5rem"
      >
        <Flex
          w="full"
          h="full"
          justify="center"
          align={{
            base: "center",
            md: "flex-start",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <NftContainer h="full">
            <NftImageViewer
              key={`nft-image-viewer-${nftDetails?.tokenId}`}
              alt={`nft-${nftDetails?.name}`}
              assetUrl={generatePinataLink(
                getIpfsLink(nftDetails?.assetUrl || "")
              )}
              setImageDetails={setImageDetails}
              flex="1"
              pos="relative"
              h="full"
              px={{
                base: "1rem",
                md: "20px",
                lg: "40px",
              }}
              maxW={{
                base: "600px",
                md: "700px",
              }}
              rounded="2xl"
              ml={{
                base: "0",
                md: "2rem",
              }}
              mb={{
                base: "3rem",
                md: "0",
              }}
            />
            <Stack
              flex="1"
              h="full"
              px={{
                base: "1rem",
                lg: "40px",
              }}
              maxW="600px"
            >
              <NftHeader
                key={`nft-header-${nftDetails?.tokenId}`}
                avatar={nftDetails?.owner?.photoURL || ""}
                name={
                  nftDetails?.owner?.displayName ||
                  nftDetails?.owner?.username ||
                  ""
                }
                pinned={user?.pinnedNFT === nftDetails?.uid}
                pinNFTHandler={pinNFTHandler}
                likeHandler={likeHandler}
                likeNFTParams={{
                  nftId: nftDetails?.uid,
                  userId: user?.uid,
                  likeCallback: (likeId: string, nftID: string) => {
                    setNftDetails((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          likes: [...(prev?.likes || []), likeId],
                          likeCount: (prev?.likeCount || 0) + 1,
                        };
                      }
                      return prev;
                    });
                  },
                  unLikeCallback: (likeId: string, nftID: string) => {
                    setNftDetails((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          likes: prev?.likes?.filter((like) => like !== likeId),
                          likeCount: (prev?.likeCount || 0) - 1,
                        };
                      }
                      return prev;
                    });
                  },
                  toast,
                }}
                isLiked={isLiked(user?.uid, nftDetails)}
                pinNFTParams={{
                  toast,
                  owner: nftDetails?.owner as IUser,
                  authDispatch,
                  uid: nftDetails?.uid || "",
                }}
                isCurrentUser={isCurrentUser}
              />
              <Divider />
              <NftInfo
                key={`nft-info-${nftDetails?.tokenId}`}
                title={nftDetails?.name || ""}
                description={
                  nftDetails?.description ||
                  "No description provided for this NFT"
                }
                chain={nftDetails?.chain || ""}
                height={imageDetails.height}
                width={imageDetails.width}
                tags={Object.entries(nftDetails?.metadata || {})}
              />
              <NftFooter links={nftFooterLinks} />
            </Stack>
          </NftContainer>
        </Flex>
        <Comments
          commentCallback={commentCallback}
          comments={commentState.comments}
          isLoading={commentState.loading}
        />
      </Flex>
    </Layout>
  );
}

export default WithAuth(NFT);

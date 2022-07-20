/* eslint-disable max-len */
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import {
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import { motion } from "framer-motion";
import router, { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { RiTwitterFill } from "react-icons/ri";
import { fadeInVariants } from "../../animations/fadeIn";
import {
  CreateCollectionModal,
  Layout,
  NftCard,
  OnlyOwnerWrapper,
} from "../../components";
import { nftCardLeftBtns } from "../../constants/nftCardLikeAndComment";
import { getNftOptions } from "../../constants/nftOptions";
import useAuth, { IUser } from "../../context/Auth/Auth";
import styles from "../../styles/profile.module.css";
import { capitalizeString } from "../../utils/capitalizeString";
import { updateCollectionHandler } from "../../utils/collection/updateCollectionHandler";
import { deleteCollection } from "../../utils/Firestore/collections/deleteCollection";
import { getCollection } from "../../utils/Firestore/collections/getCollection";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { isLiked } from "../../utils/like/isLiked";
import {
  collectionReducer,
  INITIAL_COLLECTION_STATE,
} from "../../reducer/collectionReducer";

const tweeterText = "Hi, Check out this NFT Collection on @instaNFT";

export default function CollectionPage(): JSX.Element {
  const { query, isReady } = useRouter();
  const toast = useToast();
  const { isLoading, isAuthenticated, user } = useAuth();
  const iconBtnBg = useColorModeValue("gray", "silver");
  const [collectionState, collectionDispatch] = useReducer(
    collectionReducer,
    INITIAL_COLLECTION_STATE
  );
  const iconBtnHoverBg = useColorModeValue("gray.200", "gray.700");
  const shareUrl = `${process.env.REACT_APP_BASE_URL}/collection/${query.collectionId}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweeterText}
  &url=${shareUrl}
  &hashtags=nft,nftcommunity,nftcollector,nftartist`;
  const [NFTDetails, setNFTDetails] = useState<{
    nfts: INFT[];
  }>({
    nfts: [],
  });

  const deleteCollectionHandler = async () => {
    const collectionId = query.collectionId as string;
    const deleteRes = await deleteCollection(collectionId);
    if (deleteRes.success) {
      // collectionDispatch({
      //   type: "DELETE_COLLECTION",
      //   payload: collectionId,
      // });
      toast({
        title: "Collection Deleted",
        description: "Collection has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
      router.replace("/profile");
    } else {
      toast({
        title: "Error",
        description: deleteRes.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  };

  useEffect(() => {
    if (isReady) {
      const { collectionId } = query;
      if (collectionId) {
        (async () => {
          const collectionRes = await getCollection(collectionId as string);
          if (collectionRes.success) {
            setNFTDetails({
              nfts: collectionRes.nfts,
            });
            collectionDispatch({
              type: "ADD_COLLECTION",
              payload: collectionRes.collection,
            });
          } else {
            toast({
              title: "Error",
              description: "Collection not found",
              status: "error",
              duration: 9000,
              isClosable: true,
              variant: "left-accent",
            });
            router.replace("/");
          }
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const currentUser = collectionState?.collections[0]?.owner as IUser;

  return (
    <Layout
      key="collection-page"
      title={`${capitalizeString(
        collectionState?.collections[0]?.name || "instaNFT"
      )} | Collection`}
      expandedNav={isAuthenticated}
    >
      <Flex flexDir="column" w="full" h="full" align="center" pos="relative">
        <Flex maxW="1500px" flexDir="column" w="full" h="full" p="1rem">
          <Flex
            maxW="1520px"
            w="full"
            p="1rem"
            flexDir={{
              base: "column",
              md: "row",
            }}
            justify={{
              base: "center",
              md: "space-between",
            }}
          >
            <Stack
              gap={4}
              mb={{
                base: "1rem",
                md: "0",
              }}
              // align={{
              //   base: "center",
              //   md: "flex-start",
              // }}
            >
              <Heading fontSize="2rem" mb={1}>
                <Skeleton
                  d={collectionState?.collections[0]?.name ? "none" : "block"}
                  w="250px"
                  h="50px"
                />
                {capitalizeString(collectionState?.collections[0]?.name || "")}
              </Heading>

              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                {`${
                  collectionState?.collections[0]?.items?.length || 0
                } nfts • ${
                  collectionState?.collections[0]?.tags?.length || 0
                } Tags`}
              </Text>

              <Stack direction="row" gap={4} align="center">
                <Box>
                  <SkeletonCircle
                    h="33px"
                    w="33px"
                    d={
                      currentUser?.photoURL ||
                      currentUser?.displayName ||
                      currentUser?.username
                        ? "none"
                        : "block"
                    }
                  />
                  {(currentUser?.photoURL ||
                    currentUser?.displayName ||
                    currentUser?.username) && (
                    <Avatar
                      src={currentUser?.photoURL}
                      name={currentUser?.displayName || currentUser?.username}
                      size="sm"
                    />
                  )}
                </Box>

                <Text fontWeight={600} fontSize="1rem">
                  {currentUser?.displayName || currentUser?.username ? (
                    capitalizeString(currentUser?.displayName) ||
                    currentUser?.username
                  ) : (
                    <Skeleton
                      d={
                        collectionState?.collections[0]?.name ? "none" : "block"
                      }
                      w="100px"
                      h="15px"
                    />
                  )}
                </Text>
              </Stack>
            </Stack>
            <Flex
              flexDir="column"
              justify="space-between"
              // align={{
              //   base: "center",
              //   md: "flex-start",
              // }}
            >
              <Stack
                mb={{
                  base: "0.5rem",
                  md: "0",
                }}
                isInline
              >
                <OnlyOwnerWrapper uid={currentUser?.uid}>
                  <CreateCollectionModal
                    prevTags={collectionState?.collections[0]?.tags}
                    collectionName={collectionState?.collections[0]?.name}
                    btnText="Update Collection"
                    callback={updateCollectionHandler}
                    collectionDispatch={collectionDispatch}
                    onSuccessCallback={(payload: any) => {
                      collectionDispatch({
                        type: "UPDATE_COLLECTION",
                        payload: {
                          collectionId:
                            collectionState?.collections[0]?.uid || "",
                          payload: {
                            ...collectionState?.collections[0],
                            ...payload,
                          },
                        },
                      });
                    }}
                    collectionId={collectionState?.collections[0]?.uid}
                    collectionNameDisabled
                  >
                    <Button
                      colorScheme="blue"
                      isLoading={isLoading}
                      minW="110px"
                      aria-label="Update Collection"
                    >
                      <Icon as={AiFillEdit} mr="0.5rem" />
                      Edit
                    </Button>
                  </CreateCollectionModal>
                  <Button
                    colorScheme="red"
                    isLoading={isLoading}
                    onClick={() => deleteCollectionHandler()}
                    minW="110px"
                    aria-label="Delete Collection"
                  >
                    <Icon as={AiFillDelete} mr="0.5rem" />
                    Delete
                  </Button>
                </OnlyOwnerWrapper>
              </Stack>
              <Stack isInline>
                <Button
                  minW="110px"
                  as={Link}
                  href={twitterUrl}
                  isLoading={isLoading}
                  isExternal
                  aria-label="Share on Twitter"
                >
                  <Icon
                    as={RiTwitterFill}
                    color={useColorModeValue("twitter.500", "twitter.300")}
                    mr="0.5rem"
                  />
                  Tweet
                </Button>
                <Button
                  minW="110px"
                  isLoading={isLoading}
                  onClick={async () => {
                    await navigator.clipboard.writeText(shareUrl);
                    toast({
                      title: "Copied",
                      description: "Share URL copied to clipboard",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      variant: "left-accent",
                    });
                  }}
                  aria-label="Copy Share URL"
                >
                  <Icon
                    as={BiLink}
                    color={useColorModeValue("gray.600", "gray.300")}
                    mr="0.5rem"
                  />
                  Share
                </Button>
              </Stack>
            </Flex>
          </Flex>
          <SimpleGrid
            className={styles.nftGrid}
            gap={4}
            px={{
              base: "0",
              md: "20px",
            }}
          >
            {NFTDetails?.nfts?.map((nftItem, i) => {
              const menuOptions = getNftOptions(
                router,
                nftItem?.tokenAddress,
                nftItem?.tokenId,
                nftItem?.uid || "",
                toast,
                isAuthenticated,
                nftItem?.assetUrl,
                collectionDispatch
              );
              const nftCardLeftSideBtns = nftCardLeftBtns(
                iconBtnBg,
                iconBtnHoverBg,
                user?.uid || "",
                (likeId: string, nftID: string) => {
                  setNFTDetails((prev) => {
                    return {
                      ...prev,
                      nfts: prev.nfts.map((nft) => {
                        if (nft.uid === nftID) {
                          return {
                            ...nft,
                            likes: [...(nft?.likes || []), likeId],
                            likeCount: (nft?.likeCount || 0) + 1,
                          };
                        }
                        return nft;
                      }),
                    };
                  });
                },
                (likeId: string, nftID: string) => {
                  setNFTDetails((prev) => {
                    return {
                      ...prev,
                      nfts: prev.nfts.map((nft) => {
                        if (nft.uid === nftID) {
                          return {
                            ...nft,
                            likes: (nft?.likes || []).filter(
                              (like) => like !== likeId
                            ),
                            likeCount: (nft?.likeCount || 0) - 1,
                          };
                        }
                        return nft;
                      }),
                    };
                  });
                },
                isLiked(user?.uid, nftItem),
                nftItem?.likeCount || 0,
                toast
              );
              return (
                <motion.div
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  key={`nft-card-${nftItem?.uid}`}
                >
                  <NftCard
                    className={`nft-card-${i} ${styles.nftCardItem}`}
                    containerClass={`nft-container-${i}`}
                    menuOptions={menuOptions}
                    leftSideBtns={nftCardLeftSideBtns}
                    footerHref={`/nft/${nftItem?.tokenAddress}/${nftItem?.tokenId}`}
                    {...nftItem}
                    isFullWidth
                  />
                </motion.div>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Layout>
  );
}

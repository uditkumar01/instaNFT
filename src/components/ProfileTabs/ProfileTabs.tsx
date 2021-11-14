/* eslint-disable max-len */
import { chakra } from "@chakra-ui/system";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useToast } from "@chakra-ui/toast";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { MdOutlineTableChart } from "react-icons/md";
import { BsCollection } from "react-icons/bs";
import router from "next/router";
import { motion } from "framer-motion";
import { getNftOptions } from "../../constants/nftOptions";
import { fadeInVariants } from "../../animations/fadeIn";
import { CollectionTabHeader, ImageGrid, NftCard, NoItemsFound } from "..";
import styles from "../../styles/profile.module.css";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { nftCardLeftBtns } from "../../constants/nftCardLikeAndComment";
import { getCollectionCardOptions } from "../../constants/collectionCardOptions";
import { capitalizeString } from "../../utils/capitalizeString";
import useAuth, { IUser } from "../../context/Auth/Auth";
import { ICollection } from "../../reducer/collectionReducer";

export function ProfileTabs({
  user,
  nfts,
  color,
  setTabIndex,
  isLoading,
  nftLikeHandler,
  nftDispatch,
  isLikedCheck,
  allCollections,
  collectionDispatch,
}: {
  user?: IUser | null;
  nfts: INFT[];
  color: string;
  isLoading?: boolean;
  setTabIndex: Dispatch<SetStateAction<number>>;
  nftLikeHandler: any;
  nftDispatch: Dispatch<any>;
  isLikedCheck: any;
  allCollections: ICollection[];
  collectionDispatch: any;
}): JSX.Element {
  const toast = useToast();
  const iconBtnBg = useColorModeValue("gray", "silver");
  const iconBtnHoverBg = useColorModeValue("gray.200", "gray.700");
  const { user: currentUser, isAuthenticated } = useAuth();

  return (
    <Flex w="full" justify="center">
      <Tabs
        w="full"
        maxW="1500px"
        colorScheme={color}
        onChange={(index) => {
          setTabIndex(index);
        }}
      >
        <TabList>
          <Tab className={styles.profileTab}>
            <Text d="flex" alignItems="center">
              <MdOutlineTableChart fontSize="1.2rem" />
              <chakra.span
                d={{
                  base: "none",
                  sm: "block",
                }}
              >
                &nbsp; NFTs
              </chakra.span>
            </Text>
          </Tab>
          <Tab className={styles.profileTab}>
            <Text d="flex" alignItems="center">
              <BsCollection fontSize="1.1rem" />
              <chakra.span
                d={{
                  base: "none",
                  sm: "block",
                }}
              >
                &nbsp; Collections
              </chakra.span>
            </Text>
          </Tab>
          <Tab className={styles.profileTab}>
            <Text d="flex" alignItems="center">
              <AiOutlineHeart fontSize="1.2rem" />{" "}
              <chakra.span
                d={{
                  base: "none",
                  sm: "block",
                }}
              >
                &nbsp; Liked
              </chakra.span>
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {nfts?.length ? (
              <SimpleGrid className={styles.nftGrid} spacing={4}>
                {nfts?.map((nftItem, i) => {
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
                      nftDispatch({
                        type: "LIKE_NFT",
                        payload: {
                          likeId,
                          nftId: nftID,
                        },
                      });
                    },
                    (likeId: string, nftID: string) => {
                      nftDispatch({
                        type: "UNLIKE_NFT",
                        payload: {
                          likeId,
                          nftId: nftID,
                        },
                      });
                    },
                    isLikedCheck(nftItem?.uid || "", user?.uid || ""),
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
            ) : (
              <NoItemsFound
                isLoading={isLoading}
                text="You have no NFTs yet"
                btnText="Connect you wallet"
                href="/settings/wallet"
                color={color}
              />
            )}
          </TabPanel>
          <TabPanel>
            <CollectionTabHeader collectionDispatch={collectionDispatch} />
            {allCollections?.length ? (
              <SimpleGrid className={styles.nftGrid} spacing={4}>
                {allCollections?.map((collectionItem, i) => {
                  const menuOptionData = getCollectionCardOptions(
                    router,
                    collectionItem?.uid || "",
                    toast,
                    collectionDispatch
                  );
                  let menuOptions = menuOptionData.all;
                  if (currentUser?.uid === collectionItem?.owner) {
                    menuOptions = menuOptions.concat(menuOptionData.onlyOwner);
                  }
                  return (
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      key={`nft-card-${collectionItem?.uid}`}
                    >
                      <NftCard
                        className={`nft-card-${i} ${styles.nftCardItem}`}
                        containerClass={`nft-container-${i}`}
                        rightSideEllipses={menuOptions}
                        headerText={`${collectionItem?.tags?.length} Tags • ${collectionItem?.items?.length} Collectibles`}
                        footerText="Created by"
                        footerHref={`/collection/${collectionItem?.uid}`}
                        imgChild={
                          <ImageGrid images={collectionItem?.images || []} />
                        }
                        {...collectionItem}
                        name={capitalizeString(collectionItem?.name)}
                        isFullWidth
                      />
                    </motion.div>
                  );
                })}
              </SimpleGrid>
            ) : (
              <NoItemsFound
                isLoading={isLoading}
                text="You have no collections yet"
                btnInivisible
                color={color}
              />
            )}
          </TabPanel>
          <TabPanel>
            <NoItemsFound
              isLoading={isLoading}
              text="You have no liked items yet"
              btnInivisible
              color={color}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

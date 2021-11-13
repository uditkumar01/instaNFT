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
import { getNftOptions } from "../../constants/nftOptions";
import { NftCard, NoItemsFound } from "..";
import styles from "../../styles/profile.module.css";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { nftCardLeftBtns } from "../../constants/nftCardLikeAndComment";
import useAuth, { IUser } from "../../context/Auth/Auth";

export function ProfileTabs({
  user,
  nfts,
  setTabIndex,
  isLoading,
  nftDispatch,
  isLikedCheck,
}: {
  user?: IUser | null;
  nfts: INFT[];
  isLoading?: boolean;
  setTabIndex: Dispatch<SetStateAction<number>>;
  nftDispatch: Dispatch<any>;
  isLikedCheck: any;
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
                    nftItem?.assetUrl
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
                    <NftCard
                      className={`nft-card-${i} ${styles.nftCardItem}`}
                      containerClass={`nft-container-${i}`}
                      menuOptions={menuOptions}
                      leftSideBtns={nftCardLeftSideBtns}
                      footerHref={`/nft/${nftItem?.tokenAddress}/${nftItem?.tokenId}`}
                      {...nftItem}
                      isFullWidth
                    />
                  );
                })}
              </SimpleGrid>
            ) : (
              <NoItemsFound
                isLoading={isLoading}
                text="You have no NFTs yet"
                btnText="Connect your wallet"
                href="/settings/wallet"
              />
            )}
          </TabPanel>
          <TabPanel>
            <NoItemsFound
              isLoading={isLoading}
              text="Coming soon"
              btnInivisible
            />
          </TabPanel>
          <TabPanel>
            <NoItemsFound
              isLoading={isLoading}
              text="Coming soon"
              btnInivisible
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

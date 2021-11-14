import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue, chakra } from "@chakra-ui/system";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { FiChevronDown, FiTwitter, FiMail } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { SiLinktree } from "react-icons/si";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import { AiFillEdit } from "react-icons/ai";
import router from "next/router";
import { BsGlobe } from "react-icons/bs";
import Icon from "@chakra-ui/icon";
import {
  RiErrorWarningFill,
  RiUserAddFill,
  RiUserFollowFill,
} from "react-icons/ri";
import { Tooltip } from "@chakra-ui/tooltip";
import { getUser } from "../../utils/Firestore/user/getUser";
import styles from "../../styles/profile.module.css";
import { AuthWrapper, ShowMore, SocialIcon } from "..";
import useAuth, { IUser, IUserMinimal } from "../../context/Auth/Auth";

interface UpperProfileProps {
  user: IUser | null | undefined;
  color: string;
  isLoading?: boolean;
  isCurrentUserProfile?: boolean;
  followCallback: () => Promise<void>;
}

export function UpperProfile({
  user,
  isCurrentUserProfile,
  isLoading,
  color,
  followCallback,
}: UpperProfileProps): JSX.Element {
  let followBtnProps: any = {
    colorScheme: color,
  };
  const errorColor = useColorModeValue("red.500", "red.300");
  const followBtnBg = useColorModeValue("white", "gray.800");
  const followBtnHoverBg = useColorModeValue("gray.200", "gray.700");
  const linkColor = useColorModeValue(`${color}.500`, `${color}.300`);
  const toast = useToast();
  const followInfoTextColor = useColorModeValue("gray.600", "gray.500");
  const bioTextColor = useColorModeValue("gray.900", "gray.100");
  if (color === "none") {
    followBtnProps = {
      color: "gray.500",
      bg: followBtnBg,
      _hover: {
        bg: followBtnHoverBg,
      },
    };
  }
  const [coverImgLoaded, setCoverImgLoaded] = useState(false);
  const { user: currentUser } = useAuth();

  const [commonFollowers, setCommonFollowers] = useState<{
    users: IUserMinimal[];
    total: number;
    hasFollowed: boolean;
  } | null>(null);

  useEffect(() => {
    if (user?.followers?.length && currentUser?.following?.length) {
      (async () => {
        const listOfCommonFollowers = [];
        let totalCommonFollowers = 0;
        const hasFollowed =
          user &&
          user.followers &&
          user.followers.some((follower) => follower === currentUser?.uid);
        if (hasFollowed) {
          listOfCommonFollowers.push({
            uid: currentUser?.uid,
            photoURL: currentUser?.photoURL,
            username: currentUser?.username,
          });
          totalCommonFollowers += 1;
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const follower of user.followers) {
          if (currentUser?.following?.includes(follower)) {
            if (totalCommonFollowers < 3) {
              // eslint-disable-next-line no-await-in-loop
              const resFollowers = await getUser(follower);

              if (resFollowers?.success && resFollowers?.user) {
                listOfCommonFollowers.push({
                  photoURL: resFollowers.user.photoURL,
                  uid: resFollowers.user.uid,
                  username: resFollowers.user.username,
                });
              }
            }
            totalCommonFollowers += 1;
          }
        }

        if (listOfCommonFollowers?.length) {
          setCommonFollowers({
            users: listOfCommonFollowers,
            total: totalCommonFollowers,
            hasFollowed,
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.followers]);

  const allAddress = [
    ...(user?.ethAddresses || []),
    ...(user?.polygonAddresses || []),
    ...(user?.tezosAddresses || []),
    ...(user?.solanaAddresses || []),
    ...(user?.avalancheAddresses || []),
  ];

  // console.log(
  //   "commonFollowers",
  //   commonFollowers,
  //   user?.followers,
  //   currentUser?.following
  // );

  return (
    <Flex
      flexDir="column"
      // w="full"
      h="fit-content"
      align="center"
      w={{
        base: "full",
        xl: "95%",
      }}
      pb={4}
      maxW="1600px"
    >
      <Box
        w="full"
        h={{
          base: "180px",
          sm: "220px",
          md: "280px",
        }}
        pos="relative"
      >
        <Box
          w="full"
          h="full"
          pos="relative"
          borderBottomRadius={{
            base: "0px",
            xl: "2rem",
          }}
          overflow="hidden"
        >
          {user?.coverImageURL && (
            <Image
              src={user?.coverImageURL}
              alt="profile"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              onLoad={() => setCoverImgLoaded(true)}
            />
          )}

          <Skeleton w="full" h="full" d={coverImgLoaded ? "none" : "block"} />
        </Box>
        <Box
          pos="absolute"
          left={{
            base: "20px",
            md: "40px",
          }}
          bottom="-47px"
          p={{
            base: "4px",
            md: "6px",
          }}
          rounded="full"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Avatar
            src={user?.photoURL}
            name={user?.username || user?.uid}
            size="xl"
          />
        </Box>

        <AuthWrapper>
          {!isCurrentUserProfile ? (
            <Button
              pos="absolute"
              right="16px"
              bottom="12px"
              rounded="full"
              border="3px solid"
              onClick={followCallback}
              leftIcon={
                <Icon
                  as={
                    commonFollowers?.hasFollowed
                      ? RiUserFollowFill
                      : RiUserAddFill
                  }
                />
              }
              isLoading={isLoading}
              {...followBtnProps}
              aria-label={commonFollowers?.hasFollowed ? "Unfollow" : "Follow"}
            >
              {commonFollowers?.hasFollowed ? "following" : "follow"}
            </Button>
          ) : (
            <Button
              pos="absolute"
              right="16px"
              bottom="12px"
              rounded="full"
              border="3px solid"
              onClick={() => router.push("/settings/account")}
              leftIcon={<AiFillEdit />}
              isLoading={isLoading}
              {...followBtnProps}
              aria-label="Edit profile"
            >
              Edit
            </Button>
          )}
        </AuthWrapper>
      </Box>
      <Flex
        w="full"
        pos="relative"
        justify="space-between"
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <Stack
          w="full"
          mt={14}
          p={{
            base: "0rem 2rem",
            md: "1rem 2rem",
          }}
          flex="1"
        >
          <Heading
            fontWeight={600}
            fontSize={{
              base: "1.5rem",
              sm: "1.9rem",
              md: "2rem",
              lg: "2.6rem",
            }}
            d="flex"
            alignContent="center"
          >
            <Skeleton
              d={user?.displayName || user?.username ? "none" : "block"}
              w="250px"
              h="50px"
            />
            {user?.displayName || user?.username}&nbsp;
            {!user?.emailVerified && user?.username && (
              <Tooltip
                hasArrow
                arrowSize={8}
                label="Your E-mail isn't verified yet"
                placement="auto"
              >
                <chakra.span>
                  <Icon
                    d="inline"
                    as={RiErrorWarningFill}
                    color={errorColor}
                    pos="relative"
                    h={{
                      base: "18px",
                      sm: "20px",
                      md: "25px",
                    }}
                    top="-4px"
                  />
                </chakra.span>
              </Tooltip>
            )}
          </Heading>
          <Text
            fontWeight={300}
            fontSize={{
              base: "0.9rem",
              sm: "1rem",
              md: "1.06rem",
              lg: "1.3rem",
            }}
          >
            {user?.username ? `@${user?.username}` : ""}
          </Text>
          <Skeleton d={user?.username ? "none" : "block"} w="250px" h="20px" />
          {user?.bio && (
            <Text
              pt="1rem"
              fontWeight={300}
              color={bioTextColor}
              maxW="700px"
              fontSize={{
                base: "0.95rem",
                md: "1rem",
                lg: "1.1rem",
              }}
            >
              <ShowMore text={user?.bio} maxLength={140} />
            </Text>
          )}
          <SkeletonText
            d={user?.bio !== undefined ? "none" : "block"}
            noOfLines={2}
            w="700px"
          />
        </Stack>
        <Stack
          className={styles.profileMenu}
          mt={{
            base: 0,
            md: 8,
          }}
          p={{
            base: "1rem 2rem",
            md: "1.4rem 1rem",
          }}
          pos={{
            base: "static",
            md: "absolute",
          }}
          direction="row"
          top={{
            base: "unset",
            md: "-40px",
          }}
          right={{
            base: "unset",
            md: "10px",
          }}
          justify="space-between"
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            direction="row"
            mb={{
              base: "1rem",
              md: 0,
            }}
          >
            <Button
              rounded="full"
              maxW="225px"
              border="1px solid"
              size="sm"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              onClick={async () => {
                // eslint-disable-next-line max-len
                const profileUrl = `${process.env.REACT_APP_BASE_URL}/u/${user?.username}`;
                await navigator.clipboard.writeText(profileUrl);
                toast({
                  title: "Copied",
                  description: "Profile link copied to clipboard",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  variant: "left-accent",
                });
              }}
              aria-label="Copy profile link"
            >
              <Text maxW="160px" pr={2} isTruncated>
                Share profile
              </Text>
              <IoCopyOutline />
            </Button>
            <Menu isLazy>
              <MenuButton
                as={Button}
                rightIcon={
                  <FiChevronDown
                    color={useColorModeValue("gray.300", "gray.600")}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                }
                rounded="full"
                maxW="225px"
                border="1px solid"
                size="sm"
                borderColor={useColorModeValue("gray.300", "gray.600")}
                isDisabled={allAddress.length < 1}
              >
                accounts
              </MenuButton>
              <MenuList w="100%">
                {allAddress.map((userAddress) => {
                  return (
                    <MenuItem
                      key={`user-address-${userAddress}`}
                      p="0"
                      d="flex"
                      alignItems="center"
                    >
                      <Button
                        textDecoration="none !important"
                        textAlign="left"
                        justifyContent="flex-start"
                        fontWeight="normal"
                        bg="transparent"
                        w="full"
                        rounded="none"
                        onClick={async () => {
                          await navigator.clipboard.writeText(userAddress);
                          toast({
                            title: "Copied",
                            description: "Address copied to clipboard",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                            variant: "left-accent",
                          });
                        }}
                        aria-label="Copy wallet address"
                      >
                        <Text
                          fontWeight="normal"
                          fontSize="0.9rem"
                          maxW="250px"
                          isTruncated
                        >
                          {userAddress}
                        </Text>
                      </Button>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Stack>
          <Stack alignItems="center" direction="row">
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              {user?.following?.length || 0}{" "}
              <chakra.span fontSize="sm">following</chakra.span>
            </Text>
            <chakra.span
              color={useColorModeValue("gray.600", "gray.300")}
              ml={2}
            >
              •
            </chakra.span>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              {user?.followers?.length || 0}{" "}
              <chakra.span fontSize="sm">followers</chakra.span>
            </Text>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          direction="row"
          className={styles.profileSocialMedia}
          mt={{
            base: 0,
            md: 12,
          }}
          ml={{
            base: "2.2rem",
            md: 0,
          }}
          w="fit-content"
          align="center"
          justify="space-evenly"
          rounded="full"
          h="fit-content"
          p={{
            base: "0.5rem 0",
            md: "1.9rem 1.2rem",
          }}
        >
          {user?.twitterLink && (
            <SocialIcon
              href={user?.twitterLink}
              icon={<FiTwitter fontSize="1.2rem" />}
            />
          )}
          {user?.linktreeLink && (
            <SocialIcon
              href={user?.linktreeLink}
              icon={<SiLinktree fontSize="1.2rem" />}
            />
          )}
          {user?.websiteLink && (
            <SocialIcon
              href={user?.websiteLink}
              icon={<BsGlobe fontSize="1.2rem" />}
            />
          )}
          <SocialIcon
            href={`mailto:${user?.email}`}
            icon={
              !user?.websiteLink &&
              !user?.linktreeLink &&
              !user?.twitterLink ? (
                <Flex px="1rem">
                  <FiMail fontSize="1.2rem" />
                  <Text ml="0.5rem">Mail Me</Text>
                </Flex>
              ) : (
                <FiMail fontSize="1.2rem" />
              )
            }
          />
        </Stack>
      </Flex>
      {!isCurrentUserProfile && (
        <Flex alignItems="center" w="full" px="2rem" py="0.6rem">
          <AvatarGroup size="xs" fontSize="xx-small" mr="5px">
            {commonFollowers?.users?.map((follower) => {
              return (
                <Avatar
                  key={`follower-${follower?.uid}`}
                  name={follower?.username || follower?.uid}
                  src={follower?.photoURL}
                />
              );
            })}
          </AvatarGroup>
          {(commonFollowers?.users?.length || 0) > 0 ? (
            <Flex fontSize="0.8rem" color={followInfoTextColor}>
              Followed by&nbsp;
              {commonFollowers?.users?.map((follower, index) => {
                const indexToSubtract = commonFollowers?.total > 3 ? 1 : 2;
                return (
                  <Text key={`follower-${follower?.uid}`}>
                    <Link color={linkColor} href="/profile">
                      {follower?.username === currentUser?.username
                        ? "You"
                        : follower?.username}
                    </Link>
                    {index < commonFollowers?.users?.length - indexToSubtract &&
                      ","}
                    {index ===
                      commonFollowers?.users?.length - indexToSubtract &&
                      " and"}
                    &nbsp;
                  </Text>
                );
              })}
              {commonFollowers?.total && commonFollowers?.total > 3 && (
                <Text>
                  {(commonFollowers?.total || 0) - 3}
                  {(commonFollowers?.total || 0) - 3 > 1 ? " others" : " other"}
                </Text>
              )}
            </Flex>
          ) : (
            <Text
              fontSize="0.8rem"
              color={followInfoTextColor}
              pos="relative"
              left="-4px"
            >
              Not followed by you and anyone you&apos;re following.{" "}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
}

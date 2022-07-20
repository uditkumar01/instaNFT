import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiChevronDown, HiReply } from "react-icons/hi";
import { ReplyCard } from "..";
import useColorProvider from "../../context/ColorsProvider";
import { capitalizeString } from "../../utils/capitalizeString";
import { IComment } from "../../utils/Firestore/nft/comment/addComment";
import { timeAgo } from "../../utils/timeAgo";

interface CommentCardProps extends IComment {
  showReplyCount?: boolean;
}

export function CommentCard({
  showReplyCount,
  comment,
  user,
  createdAt,
  uid,
}: CommentCardProps): JSX.Element {
  const { color } = useColorProvider();
  const textColor = useColorModeValue("gray.600", "gray.400");
  const timeColor = useColorModeValue("gray.500", "gray.500");
  const lightIconColor = useColorModeValue("gray.600", "gray.400");
  const [showReplies, setShowReplies] = useState(false);
  if (typeof user === "string" || !uid) return <></>;
  return (
    <Stack
      gap={2}
      w="full"
      px={{
        base: 1,
        md: 2,
      }}
    >
      <Stack direction="row" align="center" gap={4} maxW="1000px">
        <Avatar
          src="https://avatars0.githubusercontent.com/u/1164541?v=4"
          size="sm"
          boxShadow="xl"
        />
        {/* <Stack direction="column" gap={0}> */}
        <Text pos="relative" top="-4px" fontWeight={500} fontSize="1rem" mb={1}>
          {capitalizeString(user?.displayName || "") || user?.username}&nbsp;
          <chakra.span
            color={timeColor}
            fontSize="0.8rem"
            fontWeight="normal"
            pos="relative"
            top="-1px"
          >
            • {timeAgo(createdAt)}
          </chakra.span>
        </Text>
        {/* </Stack> */}
      </Stack>
      <Text px="5px" color={textColor} fontSize="0.9rem">
        {comment}
      </Text>
      <Flex w="full" justify="space-between" align="center" mt={4}>
        <HStack>
          {showReplyCount ? (
            <IconButton
              p="0 0.4rem"
              colorScheme={color}
              onClick={() => setShowReplies((prev) => !prev)}
              icon={
                <>
                  <HiChevronDown fontSize="1rem" color="gray" />
                  &nbsp;&nbsp;
                  <Text fontSize="0.8rem" fontWeight="normal">
                    View replies
                  </Text>
                </>
              }
              size="sm"
              variant="ghost"
              aria-label="Like"
            />
          ) : (
            <Tooltip
              label="Coming Soon"
              placement="auto"
              hasArrow
              arrowSize={8}
            >
              <Flex>
                <IconButton
                  p="0 0.4rem"
                  colorScheme={color}
                  onClick={() => setShowReplies((prev) => !prev)}
                  icon={
                    <>
                      <HiChevronDown fontSize="1rem" color="gray" />
                      &nbsp;&nbsp;
                      <Text fontSize="0.8rem" fontWeight="normal">
                        View replies
                      </Text>
                    </>
                  }
                  size="sm"
                  variant="ghost"
                  aria-label="Like"
                  isDisabled
                />
              </Flex>
            </Tooltip>
          )}
        </HStack>

        <HStack>
          <IconButton
            p="0 0.4rem"
            icon={
              <>
                <HiReply fontSize="1rem" color="gray" />
                &nbsp;&nbsp;
                <Text
                  fontSize="0.8rem"
                  fontWeight="normal"
                  color={lightIconColor}
                >
                  reply
                </Text>
              </>
            }
            size="sm"
            variant="ghost"
            aria-label="Like"
            isDisabled
          />
          {/* <IconButton
            p="0 0.4rem"
            icon={
              <>
                <AiOutlineHeart fontSize="1rem" color="gray" />
                &nbsp;&nbsp;
                <Text
                  fontSize="0.8rem"
                  fontWeight="normal"
                  color={lightIconColor}
                >
                  2
                </Text>
              </>
            }
            size="sm"
            variant="ghost"
            aria-label="Like"
          /> */}
        </HStack>
      </Flex>
      <Flex
        transform={showReplies ? "scaleY(1)" : "scaleY(0)"}
        h={showReplies ? "auto" : "0"}
        transition="transform 0.26s ease, height 0.26s ease"
        transformOrigin="top left"
        overflow="hidden"
      >
        <ReplyCard />
      </Flex>
    </Stack>
  );
}

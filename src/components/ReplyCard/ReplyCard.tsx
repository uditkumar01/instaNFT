import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { CgMailReply } from "react-icons/cg";
import { HiChevronDown, HiReply } from "react-icons/hi";
import useColorProvider from "../../context/ColorsProvider";

export function ReplyCard({
  showReplyCount,
}: {
  showReplyCount?: boolean;
}): JSX.Element {
  const { color } = useColorProvider();
  const lightIconColor = useColorModeValue("gray.600", "gray.400");
  return (
    <Stack gap={2}>
      <Stack mt={1} direction="row" gap={4} maxW="1000px">
        <Avatar
          src="https://avatars0.githubusercontent.com/u/1164541?v=4"
          size="sm"
          boxShadow="xl"
        />
        <Stack direction="column" gap={0}>
          <Stack direction="row" align="center" mb={1}>
            <Text fontWeight={600} fontSize="1rem">
              Achim Rolle{" "}
            </Text>
            <Icon
              transform="rotateY(180deg)"
              as={CgMailReply}
              color={lightIconColor}
            />
            <Text fontWeight={600} fontSize="1rem">
              Achim Rolle{" "}
            </Text>
            <chakra.span
              color={useColorModeValue("gray.500", "gray.500")}
              fontSize="0.8rem"
              fontWeight="normal"
              pos="relative"
              top="-1px"
            >
              • 15m ago
            </chakra.span>
          </Stack>
          <Text
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize="0.9rem"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            dicta iste fugiat a cumque, minima id aperiam fugit perspiciatis
            maiores ipsam, mollitia est nemo suscipit eligendi quisquam facilis
            obcaecati accusantium?
          </Text>
        </Stack>
      </Stack>
      <Flex justify="space-between" align="center" mt={4}>
        <HStack>
          {showReplyCount && (
            <IconButton
              p="0 0.4rem"
              colorScheme={color}
              icon={
                <>
                  <HiChevronDown fontSize="1rem" color="gray" />
                  &nbsp;&nbsp;
                  <Text fontSize="0.8rem" fontWeight="normal">
                    View 2 replies
                  </Text>
                </>
              }
              size="sm"
              variant="ghost"
              aria-label="Like"
            />
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
          />
          <IconButton
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
          />
        </HStack>
      </Flex>
    </Stack>
  );
}

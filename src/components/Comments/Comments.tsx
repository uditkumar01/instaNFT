import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Stack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React, { useRef, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

import { CommentCard } from "..";
import useColorProvider from "../../context/ColorsProvider";
import { IComment } from "../../utils/Firestore/nft/comment/addComment";

export function Comments({
  commentCallback,
  comments,
  isLoading,
}: {
  commentCallback: (comment: string) => Promise<void>;
  comments: IComment[];
  isLoading?: boolean;
}): JSX.Element {
  const { color } = useColorProvider();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [inProgress, setInProgress] = useState(false);
  return (
    <Flex w="full" justify="center" align="center" mt={4} p="1rem">
      <Stack
        maxW="1300px"
        rounded="xl"
        w="full"
        align="center"
        justify="center"
        gap={10}
        bg={{
          base: "transparent",
          sm: useColorModeValue("gray.50", "gray.800"),
        }}
        my={10}
        p={{
          base: "0rem",
          sm: "2rem",
        }}
        boxShadow="inner"
      >
        <Stack
          direction="row"
          w="full"
          justify="center"
          gap={{
            base: 2,
            md: 4,
          }}
        >
          <Stack
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            direction="row"
            align="center"
            w="full"
            rounded="full"
            h="58px"
            p={1}
            gap={3}
          >
            <Avatar name="John Doe" size="md" />
            <Input
              ref={commentInputRef}
              borderColor="transparent !important"
              rounded="full"
              px="0"
              h="70px"
              placeholder="Comment here..."
            />
            <IconButton
              color="gray.500"
              icon={<RiSendPlane2Fill fontSize="1.5em" />}
              onClick={async () => {
                if (commentInputRef?.current?.value) {
                  setInProgress(true);
                  await commentCallback(commentInputRef.current.value);
                  commentInputRef.current.value = "";
                  setInProgress(false);
                }
              }}
              aria-label="Send Comment"
              variant="ghost"
              bg="transparent !important"
              isLoading={isLoading || inProgress}
            />
          </Stack>
        </Stack>
        <Stack w="full" gap={4} maxW="1100px">
          {comments.map((comment) => (
            <CommentCard key={`comment-card-${comment.uid}`} {...comment} />
          ))}
        </Stack>
      </Stack>
    </Flex>
  );
}

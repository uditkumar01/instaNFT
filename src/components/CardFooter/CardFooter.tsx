import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import router from "next/router";

interface CardFooterProps {
  username: string;
  name: string;
  title: string;
  avatar: string;
  btnText: string;
  btnCallback: () => void;
}

export function CardFooter({
  username,
  name,
  title,
  avatar,
  btnText,
  btnCallback,
}: CardFooterProps): JSX.Element {
  return (
    <Flex
      w="full"
      justify="space-between"
      align="center"
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Stack mt={1} direction="row" gap={4} align="center">
        <Avatar src={avatar} name={username} size="sm" />

        <Stack direction="column" gap={0} fontSize="sm">
          <Text color="gray.500" fontSize="0.8rem">
            {title}
          </Text>
          <Text fontWeight={600} fontSize="0.85rem">
            {name}
          </Text>
        </Stack>
      </Stack>
      <Stack mt={6} direction="row" gap={4} align="center">
        <Button
          size="sm"
          rounded="full"
          onClick={btnCallback}
          aria-label={btnText}
        >
          {btnText}
        </Button>
      </Stack>
    </Flex>
  );
}

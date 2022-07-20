import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";

interface QueryCardProps {
  title: string;
  subTitle: string;
  icon: ReactElement;
  callback?: () => void;
  rightIcon?: ReactElement;
}

export function QueryCard({
  title,
  subTitle,
  icon,
  callback,
  rightIcon,
}: QueryCardProps): JSX.Element {
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      p="0.8rem"
      rounded="lg"
      cursor="pointer"
      _hover={{
        bg: useColorModeValue("gray.200", "gray.800"),
      }}
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        if (callback) callback();
      }}
    >
      <Flex>
        {icon}

        <Stack spacing="2px" ml="1rem">
          <Heading
            textTransform="capitalize"
            fontSize="1.05rem"
            maxW="150px"
            isTruncated
          >
            {title}
          </Heading>
          <Text fontSize="0.8rem" color="gray.500" maxW="150px" isTruncated>
            {subTitle}
          </Text>
        </Stack>
      </Flex>
      <IconButton
        p="0.3rem"
        icon={rightIcon || <MdOutlineSubdirectoryArrowLeft fontSize="1.3rem" />}
        size="sm"
        variant="outline"
        aria-label="Like"
        rounded="full"
        transition="all 0.2s ease"
        boxShadow="sm"
        color="gray.500"
      />
    </Flex>
  );
}

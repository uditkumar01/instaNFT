import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { AiFillLock } from "react-icons/ai";
import Image from "next/image";
import { Tooltip } from "@chakra-ui/tooltip";
import { Skeleton } from "@chakra-ui/skeleton";

interface WalletCardProps {
  name: string;
  imagePath: string;
  callback: () => void | Promise<void>;
  isLocked?: boolean;
  p?: number | string;
}

export function WalletCard({
  name,
  callback,
  isLocked,
  imagePath,
  ...rest
}: WalletCardProps): JSX.Element {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const imgBg = useColorModeValue("gray.300", "gray.900");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.500");
  return (
    <Tooltip
      label="Coming soon"
      hasArrow
      arrowSize={8}
      isDisabled={!isLocked}
      placement="top"
    >
      <Stack
        bg={cardBg}
        rounded="lg"
        p="1rem"
        w={{
          base: "full",
          lg: "auto",
        }}
        m="0.5rem"
        textAlign="center"
        spacing={0}
        border="2px solid"
        borderColor={borderColor}
        cursor="pointer"
        transition="all 0.2s ease"
        pos="relative"
        minW="150px"
        _hover={{
          transform: "translateY(-0.2rem)",
          boxShadow: "md",
        }}
        overflow="hidden"
        onClick={callback}
      >
        <Flex
          pos="absolute"
          top="0"
          left="0"
          bg="rgba(113, 128, 150, 0.5)"
          w="full"
          h="full"
          justify="center"
          align="center"
          display={isLocked ? "flex" : "none"}
          zIndex="1"
        >
          <AiFillLock color="white" size="2rem" />
        </Flex>

        <Flex
          // maxW="150px"
          // maxH="150px"
          bg={cardBg}
          rounded="lg"
          p="1rem"
          pt="0.5rem"
          mx="0.5rem"
          flex="1"
          justify="center"
        >
          <Box
            w="100%"
            h="100%"
            maxW="100px"
            maxH="100px"
            bg={imgBg}
            rounded="full"
            {...rest}
          >
            <Image
              src={imagePath}
              alt="wallet"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
        </Flex>
        <Text fontWeight="bold" color={textColor}>
          {name}
        </Text>
        <Skeleton d={name ? "none" : "block"} w="full" h="full" />
      </Stack>
    </Tooltip>
  );
}

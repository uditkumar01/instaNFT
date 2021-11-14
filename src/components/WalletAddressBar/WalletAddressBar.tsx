import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export function WalletAddressBar({
  address,
  imagePath,
}: {
  address: string;
  imagePath: string;
}): JSX.Element {
  const imgBg = useColorModeValue("gray.300", "black");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  return (
    <Flex
      mt="1rem"
      border="1px solid"
      p="0.8rem 1.3rem"
      rounded="md"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      justify="space-between"
      align="center"
      transition="all 0.2s"
      cursor="pointer"
      w="full"
      bg={cardBg}
    >
      <Flex alignItems="center" flex="1">
        <Box
          w="30px"
          h="30px"
          bg={imgBg}
          rounded="full"
          p="3px"
          mr="0.7rem"
          border="1px solid"
          borderColor="gray.500"
        >
          <Image
            src={imagePath}
            alt="wallet"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>

        <Heading
          fontSize="1.05rem"
          fontWeight="medium"
          color={useColorModeValue("gray.700", "gray.300")}
          w="100%"
          maxW={{
            base: "200px",
            md: "360px",
            lg: "500px",
          }}
          isTruncated
        >
          {address}
        </Heading>
      </Flex>
      <Box>{/* <Icon as={ImBin} fontSize="1.2rem" color="red.300" /> */}</Box>
    </Flex>
  );
}

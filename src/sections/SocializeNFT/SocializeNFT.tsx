import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import Image from "next/image";

export default function SocializeNFTSection(): JSX.Element {
  return (
    <Flex
      justify="center"
      align="center"
      pt={10}
      flexDir={{ base: "row", md: "column" }}
      w="100%"
      minH="100vh"
      pos="relative"
      overflow="hidden"
      bgGradient={`radial-gradient(circle, ${useColorModeValue(
        "whiteAlpha.900",
        "gray.900"
      )} 3%, ${useColorModeValue(
        "gray.200",
        "gray.800"
      )} 12%, ${useColorModeValue(
        "whiteAlpha.900",
        "gray.900"
      )} 21%, ${useColorModeValue(
        "gray.200",
        "gray.800"
      )} 34%, ${useColorModeValue(
        "whiteAlpha.900",
        "gray.900"
      )} 42%, ${useColorModeValue(
        "gray.200",
        "gray.800"
      )} 51%, ${useColorModeValue(
        "whiteAlpha.900",
        "gray.900"
      )} 60%, ${useColorModeValue(
        "gray.200",
        "gray.800"
      )} 70%, ${useColorModeValue(
        "whiteAlpha.900",
        "gray.900"
      )} 79%, ${useColorModeValue(
        "gray.200",
        "gray.800"
      )} 89%, ${useColorModeValue("whiteAlpha.900", "gray.800")} 100%);`}
    >
      <Flex
        pos="relative"
        w="full"
        h="full"
        maxW="1500px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex flex="1" className="asset-model-sit">
          <Image
            src="/images/model-sit.png"
            alt="model-sit"
            width={1000}
            height={1000}
            objectFit="contain"
          />
        </Flex>
        <Flex
          flex="1"
          flexDir="column"
          justify={{
            base: "flex-start",
            md: "center",
          }}
          align="center"
          textAlign="left"
          ml={{ base: "0", md: "4rem", lg: "8rem" }}
          padding={{ base: "1rem", md: "2rem" }}
        >
          <Heading
            fontSize={{
              base: "2.5rem",
              md: "3rem",
              lg: "4rem",
              xl: "4.5rem",
            }}
            textAlign={{ base: "center", md: "left" }}
            w="full"
            mb="1.8rem"
          >
            Socializing NFTs
          </Heading>
          <Text
            fontSize={{
              base: "1.2rem",
              md: "1.2rem",
              lg: "1.2rem",
              xl: "1.4rem",
            }}
            color={useColorModeValue("gray.600", "gray.500")}
            w="full"
            textAlign={{ base: "center", md: "left" }}
          >
            The NFTs are a new concept in the Decentralized Finance ecosystem.
            It is a new way to create your new digital identity.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

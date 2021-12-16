import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import Image from "next/image";
import { stories } from "../../data/stories";
import { IImageAsset } from "../Intro/Intro";
import { Story } from "../../components";

export const contentStyle = {
  background: "whitesmoke",
  width: "100%",
  color: "#333",
  height: "100%",
};

const imgAssets: Array<IImageAsset> = [
  {
    name: "looks-good-hand",
    path: "looks-good-hand.png",
  },
  {
    name: "notification1",
    path: "notification1.png",
  },
  {
    name: "notification2",
    path: "notification2.png",
  },
  {
    name: "notification3",
    path: "notification3.png",
  },
  {
    name: "notification4",
    path: "notification4.png",
  },
  {
    name: "notification5",
    path: "notification5.png",
  },
];

export default function PhoneSection(): JSX.Element {
  const { colorMode } = useColorMode();
  return (
    <Flex
      justify="center"
      align="center"
      pt={10}
      flexDir="column"
      w="100%"
      minH="100vh"
      bg={useColorModeValue("gray.200", "gray.900")}
      pos="relative"
      overflow="hidden"
    >
      <Flex zIndex="1" mx="auto" justify="center" align="center" pos="relative">
        <Flex
          width={{ base: "300px", md: "400px" }}
          height={{ base: "550px", md: "678px" }}
          pos="relative"
          transform={{ base: "scale(0.8)", md: "scale(1)" }}
        >
          <Flex w="100%" h="100%" pos="absolute">
            <Image
              src="/images/phone.png"
              alt="phone"
              width={800}
              height={1000}
              objectFit="contain"
            />
            <Flex
              pos="absolute"
              bottom="43px"
              height="33px"
              left={{ base: "43px", md: "59px" }}
              zIndex={1}
            >
              <Flex
                width={{
                  base: 217,
                  md: 285,
                }}
                height={45}
              >
                <Image
                  src="/images/phoneBaseLight.png"
                  alt="phone-base"
                  layout="fill"
                  objectFit="contain"
                  loading="lazy"
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            left="15%"
            top="1rem"
            width={{ base: "218px", md: "284px" }}
            height={{ base: "464px", md: "588px" }}
            pos="absolute"
            pt={8}
            rounded="2rem"
            borderBottomRadius="0"
            overflow="hidden"
            zIndex={1}
          >
            <Story stories={stories} />
          </Flex>
        </Flex>
      </Flex>
      <Heading
        fontSize="17rem"
        pos="absolute"
        bottom="-9%"
        left="0"
        color={useColorModeValue("whiteAlpha.900", "gray.800")}
        w="full"
        textAlign="center"
        fontWeight="900"
        zIndex="0"
        className="bg-text"
        title="INSTA NFT"
      >
        COLLECTIONS
      </Heading>
      <Flex pos="absolute" bottom="0" left="0" w="full" zIndex="0">
        {imgAssets.map(({ name, path }) => {
          return (
            <Flex key={name} pos="absolute" className={`asset-${name}`}>
              <Image
                src={`/images/${path}`}
                alt={name}
                layout="fill"
                objectFit="contain"
                loading="lazy"
                quality={100}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

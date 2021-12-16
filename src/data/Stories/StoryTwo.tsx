import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import { fadeInVariants } from "../../animations/fadeIn";
import { zoomOutVariants } from "../../animations/zoomOut";
import { StoryProfile } from "../../components";
import { contentStyle } from "../../sections/Phone/Phone";
import useColorProvider from "../../context/ColorsProvider";
import { getThemeLogoName } from "../../utils/getThemeLogoName";

export function StoryTwo(): JSX.Element {
  const { color } = useColorProvider();
  return (
    <Box sx={contentStyle}>
      <StoryProfile />
      <Box
        padding={10}
        mt={70}
        pos="relative"
        top={{
          base: "-50px",
          md: "0px",
        }}
      >
        <motion.div
          variants={zoomOutVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Flex>
            <Box
              width={{
                base: "34px",
                md: "40px",
              }}
              maxW={{
                base: "34px",
                md: "40px",
              }}
              minW={{
                base: "34px",
                md: "40px",
              }}
              pos="relative"
            >
              <Image
                src={getThemeLogoName(color)}
                alt="Keep Logo"
                layout="fill"
                objectFit="contain"
                loading="lazy"
                quality={40}
              />
            </Box>
            <Heading
              backgroundColor="#2a2a72"
              color="white"
              bgGradient="linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)"
              bgClip="text"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              textAlign="center"
              w="full"
              ml={{
                base: "2px",
                md: "10px",
              }}
            >
              instaNFT
            </Heading>
          </Flex>
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Text
            mt="1rem"
            textAlign="center"
            fontSize={{ base: "sm", md: "md", lg: "xl" }}
            color="gray.600"
          >
            is a multichain-based social network that allows users to create
            their own NFT Gallery and interact with other users.
          </Text>
        </motion.div>

        <motion.div
          variants={zoomOutVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Text mt="1rem" textAlign="center" color="#009ffd">
            @instanft
          </Text>
        </motion.div>
      </Box>
    </Box>
  );
}

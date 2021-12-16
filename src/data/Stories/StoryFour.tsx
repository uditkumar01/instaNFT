import { Flex, Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import router from "next/router";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { WithSeeMore } from "react-insta-stories";
import { zoomOutVariants } from "../../animations/zoomOut";
import { StoryProfile } from "../../components";
import useColorProvider from "../../context/ColorsProvider";
import { contentStyle } from "../../sections/Phone/Phone";

export function StoryFour({ action, story }: any): JSX.Element {
  const { color } = useColorProvider();
  return (
    <WithSeeMore
      action={action}
      story={story}
      customCollapsed={() => {
        return (
          <Flex w="full" justify="center" align="center" mb="0.8rem">
            <Button
              boxShadow="xl"
              onClick={() => {
                router.push("/auth/login");
              }}
              rounded="full"
              colorScheme={color}
              border="2px solid"
              borderColor="silver"
              aria-label="Go To Login Page"
            >
              <FaArrowRight />
            </Button>
          </Flex>
        );
      }}
    >
      <Box sx={contentStyle}>
        <StoryProfile />

        <Box padding={10} mt={70} textAlign="center">
          <motion.div
            variants={zoomOutVariants}
            initial="hidden"
            animate="visible"
          >
            <Heading
              fontWeight="700"
              backgroundColor="#2a2a72"
              color="white"
              bgGradient="linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)"
              bgClip="text"
              fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
            >
              Join
            </Heading>
          </motion.div>
          <motion.div
            variants={zoomOutVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Heading fontWeight="700" color="gray.400">
              us
            </Heading>
          </motion.div>
          <motion.div
            variants={zoomOutVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Heading
              backgroundColor="#1fd1f9"
              color="white"
              backgroundImage="linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)"
              bgClip="text"
              fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
            >
              NOW
            </Heading>
          </motion.div>
          <motion.div
            variants={zoomOutVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <Heading
              color="white"
              backgroundColor="#00bfb2"
              backgroundImage="linear-gradient(315deg, #00bfb2 0%, #028090 74%)"
              bgClip="text"
              fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
            >
              !!!
            </Heading>
          </motion.div>
        </Box>
      </Box>
    </WithSeeMore>
  );
}

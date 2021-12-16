import { Box, Heading } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import { zoomOutVariants } from "../../animations/zoomOut";
import { StoryProfile } from "../../components";
import { contentStyle } from "../../sections/Phone/Phone";

export function StoryThree(): JSX.Element {
  return (
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
            What
          </Heading>
        </motion.div>
        <motion.div
          variants={zoomOutVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Heading fontWeight="700" color="gray.400">
            are you
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
            fontSize={{ base: "3xl", md: "5xl", lg: "5xl" }}
          >
            waiting
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
            backgroundImage="linear-gradient(315deg, #00bfb2 0%, #028090 74%)"
            bgClip="text"
            fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
          >
            for ?
          </Heading>
        </motion.div>
      </Box>
    </Box>
  );
}

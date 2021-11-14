import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { getThemeLogoName } from "../../utils/getThemeLogoName";

export function Footer(): JSX.Element {
  const color = "twitter";
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box py={10}>
        <Flex
          align="center"
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image
            src={getThemeLogoName(color)}
            alt="Keep Logo"
            height="50px"
            width="50px"
          />
        </Flex>
        <Flex
          align="center"
          justify={{
            base: "center",
            md: "space-between",
          }}
          flexDir={{
            base: "column-reverse",
            md: "row",
          }}
          px={8}
          py={4}
        >
          <Text
            pt={6}
            fontSize="sm"
            textAlign="center"
            color={useColorModeValue("gray.500", "gray.400")}
            py={{
              base: 2,
              md: 0,
            }}
          >
            © 2021 InstaNFT. All rights reserved
          </Text>
          <Stack direction="row" spacing={6} py={1}>
            <IconButton
              icon={
                <Image
                  src="/images/discord.png"
                  height="40px"
                  width="40px"
                  alt="Discord"
                />
              }
              aria-label="Discord"
            />
            <IconButton
              icon={
                <Image
                  src="/images/tweet.png"
                  height="40px"
                  width="40px"
                  alt="Twitter"
                />
              }
              aria-label="Twitter"
            />
            <IconButton
              icon={
                <Image
                  src="/images/slack.png"
                  height="40px"
                  width="40px"
                  alt="Slack"
                />
              }
              aria-label="Slack"
            />
            <IconButton
              icon={
                <Image
                  src="/images/facebook.png"
                  height="40px"
                  width="40px"
                  alt="Facebook"
                />
              }
              aria-label="Facebook"
            />
            {/* <IconButton label="YouTube" href="#">
              <FaYoutube />
            </IconButton>
            <IconButton label="Instagram" href="#">
              <FaInstagram />
            </IconButton> */}
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}

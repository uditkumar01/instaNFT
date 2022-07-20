import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { motion } from "framer-motion";
import router from "next/router";
import React from "react";
import { BiCog, BiHome, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { SearchBar, TrophyModal } from "..";
import { bounceInVariants } from "../../animations/bounceIn";
import useAuth from "../../context/Auth/Auth";

export function MenuBar(): JSX.Element {
  const { user } = useAuth();
  const iconBtnColor = useColorModeValue("gray.700", "gray.200");
  const iconBtnHoverColor = useColorModeValue("gray.800", "gray.200");
  const iconBtnHoverBg = useColorModeValue("gray.300", "gray.600");
  return (
    <motion.div variants={bounceInVariants} initial="hidden" animate="visible">
      <Flex
        gap={2}
        bg={{
          base: useColorModeValue("gray.300", "gray.600"),
          sm: useColorModeValue("gray.100", "gray.700"),
        }}
        color={{
          base: useColorModeValue("gray.900", "gray.100"),
          sm: useColorModeValue("gray.800", "gray.200"),
        }}
        w={{
          base: "96%",
          sm: "fit-content",
        }}
        mb={{
          base: 1,
          md: 0,
        }}
        h="fit-content"
        p="0.4rem 0.5rem"
        align="center"
        justify="space-evenly"
        borderRadius="xl"
        pos="fixed"
        left="50%"
        top={{
          base: "unset",
          sm: "13px",
        }}
        bottom={{
          base: "0",
          sm: "unset",
        }}
        transform="translate(-50%, 0%)"
        zIndex={10}
      >
        <SearchBar>
          <IconButton
            icon={<BiSearch fontSize="1.2rem" />}
            rounded="full"
            mx={2}
            bg="transparent"
            transition="all 0.2s ease"
            aria-label="Search"
            color={useColorModeValue("gray.700", "gray.200")}
            _hover={{
              color: useColorModeValue("gray.800", "gray.200"),
              bg: useColorModeValue("gray.300", "gray.600"),
            }}
          />
        </SearchBar>
        <TrophyModal />

        <IconButton
          icon={<CgProfile fontSize="1.2rem" />}
          rounded="full"
          mx={2}
          onClick={() => {
            if (router.pathname !== `/u/${user?.username}`) {
              router.push(`/u/${user?.username}`);
            }
          }}
          bg="transparent"
          transition="all 0.2s ease"
          aria-label="Profile"
          color={useColorModeValue("gray.700", "gray.200")}
          _hover={{
            color: useColorModeValue("gray.800", "gray.200"),
            bg: useColorModeValue("gray.300", "gray.600"),
          }}
        />
        <IconButton
          icon={<BiCog fontSize="1.3rem" />}
          rounded="full"
          mx={2}
          onClick={() => {
            if (router.pathname !== `/settings/display`) {
              router.push(`/settings/display`);
            }
          }}
          bg="transparent"
          transition="all 0.2s ease"
          aria-label="Settings"
          color={iconBtnColor}
          _hover={{
            color: iconBtnHoverColor,
            bg: iconBtnHoverBg,
          }}
        />
      </Flex>
    </motion.div>
  );
}

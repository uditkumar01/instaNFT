import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { chakra, useColorMode, useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { BsSunFill } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import { motion } from "framer-motion";
import { Avatar } from "@chakra-ui/avatar";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import Image from "next/image";
import { FaCog, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import router from "next/router";
import { zoomInVariants } from "../../animations/zoomIn";
import { getThemeLogoName } from "../../utils/getThemeLogoName";
import useAuth from "../../context/Auth/Auth";
import { signOut } from "../../utils/Firestore/google/googleSignOut";
import { setItem } from "../../utils/localStorage/setItem";

export function Navbar({
  expandedNav,
  overrideColor,
}: {
  expandedNav?: boolean;
  overrideColor?: string;
}): JSX.Element {
  const color = "twitter";
  const { isAuthenticated, user, isLoading } = useAuth();
  const { colorMode, setColorMode } = useColorMode();
  // const btnBgColor = useColorModeValue("brandLight.900", "brandLight.800");
  const navBg = useColorModeValue("white", "gray.800");
  // const btnhoverBgColor = useColorModeValue("brandLight.700", "brandDark.200");
  const userColorScheme = overrideColor || color;
  const btnProps = {
    colorScheme: userColorScheme,
  };
  // if (color === "none") {
  //   btnProps = {
  //     bg: btnBgColor,
  //     color: "white",
  //     _hover: {
  //       bg: btnhoverBgColor,
  //     },
  //   };
  // }
  return (
    <Flex
      w="full"
      justify="center"
      align="center"
      pos="fixed"
      top="0"
      left="0"
      zIndex={10}
      borderBottom={expandedNav ? "1px solid" : "none"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={navBg}
      boxShadow={expandedNav ? "md" : "none"}
    >
      <Flex
        w="full"
        justify="space-between"
        p={{ base: "0.4rem", md: "1rem 2rem" }}
        maxW={expandedNav ? "full" : "1600px"}
        pt={{ base: "0.9rem", md: "1rem" }}
        align="center"
      >
        <Flex
          align="center"
          pos="relative"
          p={{ base: "0.4rem", md: "0.2rem 0.4rem" }}
          rounded="full"
          cursor="pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <motion.span
            key={`${colorMode}-${color}-logo`}
            variants={zoomInVariants}
            initial="hidden"
            animate="visible"
            style={{
              height: "35px",
              width: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "0.3rem",
            }}
          >
            <Image
              src={getThemeLogoName(userColorScheme)}
              alt="instaNFT Logo"
              height="35px"
              width="35px"
              aria-label="instaNFT Logo"
              about="instaNFT Logo"
              className={`${color}-theme-logo`}
            />
          </motion.span>
          <chakra.span
            ml="0.5rem"
            fontSize="1.6rem"
            fontWeight="medium"
            d={{ base: "none", md: "block" }}
            pr="0.4rem"
          >
            <chakra.span color="gray">insta</chakra.span>
            NFT
          </chakra.span>
        </Flex>
        {/* <Flex></Flex> */}
        <HStack spacing={4}>
          {!isAuthenticated ? (
            <motion.div
              variants={zoomInVariants}
              initial="hidden"
              animate="visible"
              key={`${colorMode}-${color}-try-now-btn`}
            >
              <Button
                rounded="full"
                px={6}
                boxShadow="2xl"
                transition="all 0.2s"
                onClick={() => router.push("/auth/login")}
                isLoading={isLoading}
                {...btnProps}
                aria-label="Login"
              >
                Login
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={zoomInVariants}
              initial="hidden"
              animate="visible"
            >
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Box
                    border="2px solid"
                    borderColor={`${color}.500`}
                    p="2px"
                    rounded="full"
                  >
                    <Avatar
                      h="36px"
                      width="36px"
                      src={user?.photoURL}
                      name={user?.username || user?.uid}
                    />
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem p="0" d="flex" alignItems="center">
                    <Button
                      textDecoration="none !important"
                      textAlign="left"
                      justifyContent="flex-start"
                      fontWeight="normal"
                      bg="transparent"
                      w="full"
                      rounded="none"
                      onClick={() => {
                        if (router.pathname !== `/u/${user?.username}`) {
                          router.push(`/u/${user?.username}`);
                        }
                      }}
                      aria-label="Profile"
                    >
                      <FaUser fontSize="1rem" /> &nbsp;&nbsp; Profile
                    </Button>
                  </MenuItem>
                  <MenuItem p="0" d="flex" alignItems="center">
                    <Button
                      textDecoration="none !important"
                      textAlign="left"
                      justifyContent="flex-start"
                      fontWeight="normal"
                      bg="transparent"
                      w="full"
                      rounded="none"
                      onClick={() => {
                        // if current path is not same
                        if (router.pathname !== "/settings/account") {
                          router.push("/settings/account");
                        }
                      }}
                      aria-label="Settings"
                    >
                      <FaCog fontSize="1rem" /> &nbsp;&nbsp; Settings
                    </Button>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem p="0" d="flex" alignItems="center">
                    <Button
                      textDecoration="none !important"
                      textAlign="left"
                      justifyContent="flex-start"
                      fontWeight="normal"
                      bg="transparent"
                      w="full"
                      rounded="none"
                      onClick={() => {
                        signOut();
                      }}
                      aria-label="Logout"
                    >
                      <MdLogout fontSize="1.2rem" /> &nbsp;&nbsp;Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </motion.div>
          )}
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            animate="visible"
          >
            <IconButton
              boxShadow={`0 2px 4px ${useColorModeValue(
                "whiteAlpha.900",
                "blackAlpha.200"
              )}`}
              bg={useColorModeValue("white", "gray.600")}
              borderWidth="2px"
              borderColor={useColorModeValue("gray.300", "gray.500")}
              pos="relative"
              zIndex="3"
              rounded="full"
              onClick={() => {
                if (colorMode === "light") {
                  setColorMode("dark");
                  setItem("instaNFTTheme", "dark");
                } else {
                  setColorMode("light");
                  setItem("instaNFTTheme", "light");
                }
              }}
              aria-label="change theme"
              icon={
                colorMode === "light" ? (
                  <Image
                    alt="light theme"
                    src="/images/sun.png"
                    width={30}
                    height={30}
                    objectFit="contain"
                    objectPosition="center"
                  />
                ) : (
                  <Image
                    alt="light theme"
                    src="/images/moon.png"
                    width={30}
                    height={30}
                    objectFit="contain"
                    objectPosition="center"
                  />
                )
              }
            />
          </motion.div>
        </HStack>
      </Flex>
    </Flex>
  );
}

import { Box, Flex } from "@chakra-ui/layout";
import { FaCog } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDashboardCustomize, MdPrivacyTip } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";
import { IoMdWallet } from "react-icons/io";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import router from "next/router";
import { AiFillFileAdd } from "react-icons/ai";

const NavItem = ({
  icon,
  href,
  children,
  isDisabled,
  ...rest
}: any): JSX.Element => {
  const grpColor = useColorModeValue("gray.600", "gray.100");
  const bgHover = useColorModeValue("gray.100", "gray.900");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (router.pathname === href) {
      setIsActive(true);
    }
  }, [href]);
  const bg = isActive ? bgHover : "transparent";
  const borderLeftColor = isActive ? grpColor : "transparent";
  return (
    <Button
      variant="unstyled"
      fontWeight={400}
      fontSize="sm"
      textAlign="left"
      textDecoration="none !important"
      onClick={() => {
        if (router.pathname !== href) {
          router.push(href);
        }
      }}
      aria-label={children}
      isDisabled={isDisabled}
    >
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        color={useColorModeValue("inherit", "gray.400")}
        bg={bg}
        borderLeft="2px solid transparent"
        borderLeftColor={borderLeftColor}
        {...rest}
        _hover={{
          bg: bgHover,
          color: useColorModeValue("gray.900", "gray.200"),
          borderLeftColor: grpColor,
        }}
        role="group"
        fontWeight="semibold"
        transition="all 0.2s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: grpColor,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Button>
  );
};

const SidebarContent = ({
  sidebarToggle,
  active,
  ...props
}: any): JSX.Element => {
  return (
    <>
      <Box
        as="nav"
        h="100vh"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
        minW="60"
        // maxH="calc(100vh - 64px)"
        pt={{ base: "110px", md: "48px" }}
        pos="fixed"
        top={{
          base: 0,
          md: "68px",
        }}
        {...props}
      >
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={RiEditCircleFill} href="/settings/account">
            Account
          </NavItem>
          <NavItem icon={IoMdWallet} href="/settings/wallet">
            Wallet
          </NavItem>
          <NavItem icon={AiFillFileAdd} href="/mint">
            Mint
          </NavItem>
          <NavItem icon={MdDashboardCustomize} href="/settings/display">
            Display
          </NavItem>
          <NavItem icon={IoLanguageSharp} href="/settings/language">
            Language
          </NavItem>
          <NavItem icon={MdPrivacyTip} href="/settings/pp">
            Privacy &amp; Policy
          </NavItem>
          <NavItem icon={BsFillFileTextFill} href="/settings/tnc">
            Terms &amp; Conditions
          </NavItem>
        </Flex>
      </Box>
    </>
  );
};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "-100%" },
};

export function Sidebar(): JSX.Element {
  // const sidebar = useDisclosure();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const iconBtnColor = useColorModeValue("gray.200", "gray.200");
  const iconBtnHoverColor = useColorModeValue("gray.800", "gray.200");
  const iconBtnHoverBg = useColorModeValue("gray.300", "gray.600");
  const sidebarToggle = () => {
    setSidebarIsOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    const handleSidebarinitialState = () => {
      if (window.innerWidth < 768) {
        setSidebarIsOpen(false);
      }
    };
    handleSidebarinitialState();
  }, []);

  return (
    <>
      <IconButton
        display={{
          base: "flex",
          md: "none",
        }}
        icon={<FaCog fontSize="1.2rem" />}
        onClick={sidebarToggle}
        rounded="full"
        pos="fixed"
        bottom={{
          base: "4.5rem",
          sm: "1rem",
        }}
        right="1rem"
        mx={2}
        transition="all 0.2s ease"
        aria-label="Settings"
        size="lg"
        zIndex={9}
        color={iconBtnColor}
        _hover={{
          color: iconBtnHoverColor,
          bg: iconBtnHoverBg,
        }}
        bg={useColorModeValue("brandLight.900", "brandLight.800")}
      />
      <Flex
        pos={{
          base: "fixed",
          md: "relative",
        }}
        zIndex={4}
        className={`sidebar ${sidebarIsOpen ? "open" : "close"}`}
        top="0"
        left="0"
        w="60"
        minW="60"
      >
        <motion.div
          animate={sidebarIsOpen ? "open" : "closed"}
          variants={variants}
          // bouncy transition
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 200,
          }}
        >
          <SidebarContent sidebarToggle={sidebarToggle} />
        </motion.div>
      </Flex>
    </>
  );
}

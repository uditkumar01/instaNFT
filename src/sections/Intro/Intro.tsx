import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import Image from "next/image";
import router from "next/router";
import { fadeInVariants } from "../../animations/fadeIn";
import { zoomInVariants } from "../../animations/zoomIn";
import { ButtonLg } from "../../components";
import useAuth from "../../context/Auth/Auth";
import useLanguage from "../../context/Language/LanguageProvider";

export interface IImageAsset {
  name: string;
  path: string;
}

const imgAssets: Array<IImageAsset> = [
  {
    name: "pointing-hand",
    path: "pointing-hand.png",
  },
];

export default function LandingIntro(): JSX.Element {
  const btnBg = useColorModeValue("brandLight.900", "brandLight.800");
  const btnColor = "white";
  const btnBorderColor = useColorModeValue("brandLight.400", "brandLight.400");
  const btnHoverBg = useColorModeValue("brandLight.700", "brandLight.700");
  const { lang } = useLanguage();
  const nftSocialNetwork = "NFT SOCIAL NETWORK";
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <Flex
      align="center"
      w="100%"
      minW="100vw"
      h="100vh"
      flexDir="column"
      overflow="hidden"
      pos="relative"
      minH={{ base: "666px", sm: "100vh" }}
    >
      <Stack
        spacing={14}
        align="center"
        h="full"
        mt="8.1rem"
        pos="relative"
        overflow="hidden"
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <Heading
            fontSize="7rem"
            textAlign="center"
            color={useColorModeValue("gray.800", "gray.100")}
            className="nft-social-network"
            textTransform="uppercase"
            lineHeight="1.4"
          >
            {nftSocialNetwork}
          </Heading>
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <Heading
            fontSize="2rem"
            fontWeight="normal"
            pb="4rem"
            className="join-text"
            color={useColorModeValue("gray.500", "gray.500")}
          >
            Join the revolution
          </Heading>
        </motion.div>
        <motion.div
          variants={zoomInVariants}
          initial="hidden"
          animate="visible"
        >
          <ButtonLg
            label="Get Started"
            callback={() => {
              router.push(isAuthenticated ? "/profile" : "/auth/login");
            }}
            border="6px solid"
            isLoading={isLoading}
            btnTheme={{
              bg: btnBg,
              color: btnColor,
              borderColor: btnBorderColor,
              _hover: {
                bg: btnHoverBg,
              },
            }}
          />
        </motion.div>
      </Stack>
      <Heading
        fontSize="17rem"
        pos="absolute"
        bottom="-9%"
        left="0"
        color={useColorModeValue("gray.100", "gray.900")}
        w="full"
        textAlign="center"
        fontWeight="900"
        zIndex="-1"
        className="bg-text"
        title="INSTA NFT"
      >
        INSTA NFT
      </Heading>
      <Box
        pos="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="62%"
        zIndex="-1"
        overflow="hidden"
      >
        <Image
          src="/images/landing1.png"
          alt="landing-cover"
          layout="fill"
          loading="lazy"
          quality={90}
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Flex pos="absolute" bottom="0" left="0" w="full" zIndex="-1">
        {imgAssets.map(({ name, path }) => {
          return (
            <Flex key={name} pos="absolute" className={`asset-${name}`}>
              <Image
                src={`/images/${path}`}
                alt={name}
                height={1000}
                width={1000}
                loading="lazy"
                quality={90}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

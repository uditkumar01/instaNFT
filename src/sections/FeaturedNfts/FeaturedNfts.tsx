/* eslint-disable max-len */
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import Image from "next/image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ButtonLg, NftCard } from "../../components";
import { fadeInVariants } from "../../animations/fadeIn";
import { getNfts } from "../../utils/Firestore/nft/getNfts";
import { INFT } from "../../utils/Firestore/nft/addNfts";

export default function FeaturedNfts(): JSX.Element {
  const [step, setStep] = useState(6);
  const [pageNo, setPageNo] = useState(0);
  const [nfts, setNfts] = useState<Array<INFT>>([]);

  useEffect(() => {
    // window resize event listener
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setStep((prev) => (prev === 2 ? prev : 2));
      } else if (window.innerWidth <= 1143) {
        setStep((prev) => (prev === 4 ? prev : 4));
      } else if (window.innerWidth > 1143) {
        setStep((prev) => (prev === 6 ? prev : 6));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getFeaturedNfts = async (page: number, limit: number) => {
    const resNfts = await getNfts(page, limit, "likeCount", "desc");
    if (resNfts?.success) {
      setNfts((prev) => [...prev, ...(resNfts?.nftRes || [])]);
    }
  };

  const nextPage = () => {
    if ((pageNo + 1) * step < nfts.length - 1) {
      setPageNo((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageNo > 0) {
      setPageNo((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getFeaturedNfts(12, step);
  }, [step]);

  const currentPageNfts = nfts?.slice(pageNo * step, (pageNo + 1) * step);

  return (
    <Flex
      w="100%"
      minH="180vh"
      justify="center"
      align="center"
      pos="relative"
      overflow="hidden"
    >
      <Flex
        align="center"
        flexDir="column"
        w="100%"
        minH="100vh"
        pos="relative"
        overflow="hidden"
        pt={{ base: "1rem", md: "1rem" }}
        px="1rem"
        maxW="1200px"
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <Heading
            fontSize="5xl"
            textAlign="center"
            color={useColorModeValue("gray.500", "gray.300")}
          >
            Featured{" "}
            <chakra.span
              color={useColorModeValue("brandLight.900", "brandLight.700")}
            >
              NFT
            </chakra.span>
            s
          </Heading>
        </motion.div>
        <Box
          w="full"
          d="grid"
          gridGap="1rem"
          className="landing-grid"
          placeContent="center"
          mt={{ base: "1rem", md: "3rem" }}
        >
          {currentPageNfts?.map((nftItem, i) => {
            return (
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                // eslint-disable-next-line max-len
                key={`nft-card-landing-${nftItem?.tokenAddress}-${nftItem?.tokenId}`}
              >
                <NftCard
                  className={`nft-card-${i} nft-grid-card`}
                  containerClass={`featured-nft-container-${i}`}
                  footerHref={`/nft/${nftItem?.tokenAddress}/${nftItem?.tokenId}`}
                  {...nftItem}
                />
              </motion.div>
            );
          })}
        </Box>
        <Flex>
          <ButtonLg
            mt="2rem"
            icon={<AiFillCaretLeft fontSize="2.2rem" />}
            callback={() => {
              prevPage();
            }}
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("gray.600", "gray.600")}
            border="6px solid"
            borderColor={useColorModeValue("gray.600", "gray.600")}
            fontSize="1.7rem"
            p="2rem 1rem"
            borderWidth="4px"
            _hover={{
              bg: useColorModeValue("gray.200", "gray.900"),
            }}
            _active={{
              bg: useColorModeValue("gray.200", "gray.900"),
            }}
            boxShadow="2xl"
            mr="1.5rem"
          />
          <ButtonLg
            mt="2rem"
            icon={<AiFillCaretRight fontSize="2.2rem" />}
            callback={() => {
              nextPage();
            }}
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("gray.600", "gray.600")}
            border="6px solid"
            borderColor={useColorModeValue("gray.600", "gray.600")}
            fontSize="1.7rem"
            p="2rem 1rem"
            borderWidth="4px"
            _hover={{
              bg: useColorModeValue("gray.200", "gray.900"),
            }}
            _active={{
              bg: useColorModeValue("gray.200", "gray.900"),
            }}
            boxShadow="2xl"
          />
        </Flex>
      </Flex>
      <Heading
        fontSize="17rem"
        pos="absolute"
        bottom="-8%"
        left="0"
        color={useColorModeValue("gray.200", "gray.900")}
        w="full"
        textAlign="center"
        fontWeight="900"
        zIndex="-1"
        className="bg-text"
        title="INSTA NFT"
      >
        FEATURED
      </Heading>
      <Flex flex="1" className="asset-bg-pattern" pos="absolute" zIndex="-1">
        <Image
          src="/images/bg-pattern.png"
          alt="model-sit"
          width={1000}
          height={1000}
          objectFit="contain"
        />
      </Flex>
    </Flex>
  );
}

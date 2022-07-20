/* eslint-disable max-len */
import React, { useState } from "react";
import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Skeleton } from "@chakra-ui/skeleton";
import router from "next/router";
import { IUser } from "../../context/Auth/Auth";
import { CARD_IMAGE_HEIGHT } from "../../data/imageDimensions";
import { CardFooter, CustomIconButton, CustomMenu } from "..";
import { INftBtns } from "../../constants/nftCardLikeAndComment";
import { capitalizeString } from "../../utils/capitalizeString";
import { generatePinataLink } from "../../utils/generatePinataLink";
import { getIpfsLink } from "../../utils/getIPFSLink";
import { isVideo } from "../../utils/isVideo";
import useColorProvider from "../../context/ColorsProvider";
import Image from "next/image";

// interface NftCardProps extends INFT {
//   className?: string;
//   containerClass?: string;
//   isFullWidth?: boolean;
//   imgChild?: ReactNode;
//   menuOptions?: INftOptions[];
//   leftSideBtns?: INftBtns[];
//   rightSideEllipses?: INftOptions[];
//   footerText?: string;
//   headerText?: string;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function NftCard({
  className,
  containerClass,
  isFullWidth,
  name,
  assetUrl,
  owner,
  tokenAddress,
  tokenId,
  imgChild,
  uid,
  leftSideBtns,
  menuOptions,
  rightSideEllipses,
  footerText,
  headerText,
  footerHref,
}: any): JSX.Element {
  // eslint-disable-next-line no-param-reassign
  owner = owner as IUser;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const imageUrl = getIpfsLink(generatePinataLink(assetUrl));
  const isVideoAsset = isVideo(imageUrl);
  const checkIfUrlisDataURL = imageUrl.startsWith("data:");
  const imageSrcStr = checkIfUrlisDataURL
    ? imageUrl
    : `/api/imageProxy?imageUrl=${encodeURIComponent(imageUrl)}`;
  const [imageSrc, setImageSrc] = useState(imageSrcStr);
  return (
    <Center
      py={6}
      className={containerClass || ""}
      transition="all 0.2s ease"
      pos="relative"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "md",
        zIndex: 2,
      }}
    >
      <Box
        maxW={!isFullWidth ? "360px" : "none"}
        border={
          isFullWidth
            ? `1px solid ${useColorModeValue("white", "#2a2e35")}`
            : "none"
        }
        minW="300px"
        w="full"
        bg={useColorModeValue("white", "gray.600")}
        boxShadow="2xl"
        rounded="md"
        p={6}
        overflow="hidden"
        className={className || ""}
      >
        <Box
          className="nft-card-image"
          height={{
            base: "240px",
            sm: isFullWidth ? "500px" : CARD_IMAGE_HEIGHT,
            md: CARD_IMAGE_HEIGHT,
          }}
          bg={useColorModeValue("gray.100", "gray.800")}
          mt={-6}
          mx={-6}
          mb={6}
          pos="relative"
          overflow="hidden"
        >
          {assetUrl && !imgChild && (
            <>
              {isVideoAsset ? (
                <video width="100%" height="100%" controls>
                  <track kind="captions" />
                  <source src={imageUrl} type={`video/${isVideoAsset}`} />
                </video>
              ) : (
                <Image
                  src={imageSrc}
                  objectFit="cover"
                  objectPosition="center"
                  layout="fill"
                  onLoadingComplete={() => setIsImgLoaded(true)}
                  alt={imageUrl || `${name} nft asset`}
                  loading="lazy"
                  onError={(e) => {
                    console.log("Bad image", e);
                    setImageSrc("/images/broken.png");
                  }}
                  // quality={0.6}
                />
              )}
            </>
          )}
          {imgChild}
          <Skeleton
            height="100%"
            width="100%"
            d={isImgLoaded || imgChild ? "none" : "block"}
          />
        </Box>
        {headerText && (
          <Text fontWeight="normal" color="gray.500" fontSize="0.9rem">
            {headerText}
          </Text>
        )}
        <Stack>
          <Flex w="full" justify="space-between" align="center" pb={1}>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize="lg"
              fontWeight={600}
            >
              {name}
            </Heading>
            <Flex zIndex={2}>
              {rightSideEllipses && (
                <CustomMenu options={rightSideEllipses || []} uid={uid || ""} />
              )}
            </Flex>
          </Flex>

          <Flex w="full" justify="space-between" align="flex-end" pb={1}>
            {leftSideBtns && (
              <Stack align="center" mb={1} isInline spacing={1}>
                {leftSideBtns?.map((btnItem: INftBtns) => (
                  <CustomIconButton
                    key={`icon-btn-${btnItem?.["aria-label"]}-${uid}`}
                    nftId={uid || ""}
                    {...btnItem}
                  />
                ))}
              </Stack>
            )}

            {menuOptions && (
              <CustomMenu options={menuOptions || []} uid={uid || ""} />
            )}
          </Flex>
        </Stack>
        <CardFooter
          avatar={owner?.photoURL || ""}
          name={capitalizeString(owner?.displayName) || owner?.username}
          username={owner?.username || ""}
          btnText="View"
          title={footerText || "Owned by"}
          key={`card-footer-${uid}`}
          btnCallback={() => {
            if (router.pathname !== footerHref) {
              router.push(footerHref);
            }
          }}
        />
      </Box>
    </Center>
  );
}

/* eslint-disable max-len */
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Flex, FlexProps } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Dispatch, SetStateAction } from "react";

interface NftImageProps extends FlexProps {
  src: string;
  alt: string;
  setImageDetails: Dispatch<
    SetStateAction<{
      height: number;
      width: number;
    }>
  >;
}

export function NftImage({
  src,
  alt,
  setImageDetails,
  ...props
}: NftImageProps): JSX.Element {
  const { colorMode } = useColorMode();
  // get the image dimensions in px and image file size in kb from the image url
  const getImageDetails = async (event: any): Promise<void> => {
    const imageHeight = event.target?.naturalHeight;
    const imageWidth = event.target?.naturalWidth;
    setImageDetails({
      height: imageHeight,
      width: imageWidth,
    });
  };
  return (
    <Flex {...props}>
      {src && (
        <Image
          src={src}
          objectFit="cover"
          alt="pinned nft image"
          rounded="2xl"
          minH="200px"
          id="pinned-image"
          w="full"
          onLoad={getImageDetails}
          boxShadow={{
            base: "none",
            sm:
              colorMode === "dark"
                ? "10px 10px 0px #0e1016, -10px -10px 0px #202230"
                : "10px 10px 0px #d6d6d6, -10px -10px 0px #ffffff",
          }}
        />
      )}
      <Skeleton
        d={src ? "none" : "block"}
        w={{
          base: "300px",
          md: "360px",
          lg: "500px",
          xl: "660px",
        }}
        h={{
          base: "300px",
          md: "360px",
          lg: "500px",
          xl: "660px",
        }}
        rounded="2xl"
      />
    </Flex>
  );
}

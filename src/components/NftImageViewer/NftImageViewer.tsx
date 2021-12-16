import { Skeleton } from "@chakra-ui/skeleton";
// import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Dispatch, SetStateAction } from "react";
import { ImageViewer } from "..";
import { isVideo } from "../../utils/isVideo";

interface NftImageViewerProps extends BoxProps {
  assetUrl?: string;
  alt: string;
  setImageDetails: Dispatch<
    SetStateAction<{
      height: number;
      width: number;
    }>
  >;
}

export function NftImageViewer({
  assetUrl,
  alt,
  setImageDetails,
  ...props
}: NftImageViewerProps): JSX.Element {
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
  const isVideoAsset = isVideo(assetUrl);
  return (
    <Box {...props}>
      {assetUrl && (
        <ImageViewer src={assetUrl} isVideoAsset={isVideoAsset}>
          {isVideoAsset ? (
            <video width="100%" height="100%">
              <track kind="captions" />
              <source src={assetUrl} type={`video/${isVideoAsset}`} />
            </video>
          ) : (
            <Image
              src={assetUrl}
              layout="fill"
              objectFit="cover"
              alt={alt}
              rounded="2xl"
              id="pinned-image"
              onLoad={getImageDetails}
              w="full"
              // h="full"
              minH="200px"
              boxShadow={{
                base: "none",
                sm:
                  colorMode === "dark"
                    ? "10px 10px 0px #0e1016, -10px -10px 0px #202230"
                    : "10px 10px 0px #d6d6d6, -10px -10px 0px #ffffff",
              }}
            />
          )}
        </ImageViewer>
      )}
      <Skeleton
        d={assetUrl ? "none" : "block"}
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
    </Box>
  );
}

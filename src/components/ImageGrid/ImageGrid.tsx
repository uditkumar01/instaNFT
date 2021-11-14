import { Image } from "@chakra-ui/image";
import { Skeleton } from "@chakra-ui/skeleton";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { getSquareRootWholeNum } from "../../utils/getSquareRootWholeNum";

const COLLECTION_CARD_DIMENSIONS = {
  height: "100%",
  width: "100%",
};

const label = "avatar";

export function ImageGrid({ images }: { images: string[] }): JSX.Element {
  let squareNum = getSquareRootWholeNum(images?.length || 0);
  squareNum = squareNum > 5 ? 5 : squareNum;

  const emptyImagePath = "/images/empty.png";

  const imageArray = squareNum
    ? images.slice(0, squareNum * squareNum)
    : [emptyImagePath];
  return (
    <Box
      role="group"
      w="full"
      border="1px solid rgba(255, 255, 255, 0.125)"
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
      overflow="hidden"
      height="full"
      width={COLLECTION_CARD_DIMENSIONS.width}
      minH={COLLECTION_CARD_DIMENSIONS.height}
      p="2px"
    >
      <SimpleGrid w="full" h="full" columns={squareNum} spacing={0}>
        {imageArray?.map((image) => {
          return (
            <Box
              border="2px solid transparent"
              key={`collections-item-${image}`}
              overflow="hidden"
              pos="relative"
              w="full"
              h="full"
              rounded="lg"
            >
              <Image
                src={image}
                objectFit={emptyImagePath === image ? "contain" : "cover"}
                objectPosition="center"
                w="full"
                h="full"
                alt={label}
              />
              <Skeleton d={image ? "none" : "block"} w="full" h="full" />
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

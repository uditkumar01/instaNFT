import { IconButtonProps } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { chakra } from "@chakra-ui/system";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { likeHandler } from "../utils/like/likeHandler";

export interface INftBtns extends IconButtonProps {
  callback: (nftId: string) => void | Promise<void>;
}

export function LikeIcon(props: any) {
  const { isLiked, likeCount, iconBtnBg } = props;
  return (
    <>
      {isLiked ? (
        <Icon as={AiFillHeart} color={iconBtnBg} h="20px" w="20px" />
      ) : (
        <Icon as={AiOutlineHeart} color={iconBtnBg} h="20px" w="20px" />
      )}
      <chakra.span fontSize="sm" fontWeight="400" ml="0.3rem" color={iconBtnBg}>
        {likeCount}
      </chakra.span>
    </>
  );
}

export const nftCardLeftBtns = (
  iconBtnBg: string,
  iconBtnHoverBg: string,
  userId: string,
  likeCallback: any,
  unLikeCallback: any,
  isLiked: boolean,
  likeCount: number,
  toast: any
): Array<INftBtns> => [
  {
    icon: (
      <LikeIcon isLiked={isLiked} likeCount={likeCount} iconBtnBg={iconBtnBg} />
    ),
    bg: "transparent",
    h: "fit-content",
    p: "0.3rem 0.4rem",
    _hover: { bg: iconBtnHoverBg },
    "aria-label": "Like",
    callback: async (nftId: string) => {
      await likeHandler({
        nftId,
        userId,
        likeCallback,
        unLikeCallback,
        toast,
      });
    },
  },
  {
    icon: (
      <>
        <Icon as={BiMessageRounded} color={iconBtnBg} h="20px" w="20px" />

        <chakra.span
          fontSize="sm"
          fontWeight="400"
          ml="0.3rem"
          color={iconBtnBg}
        >
          0
        </chakra.span>
      </>
    ),
    bg: "transparent",
    h: "fit-content",
    p: "0.3rem 0.4rem",
    _hover: { bg: iconBtnHoverBg },
    "aria-label": "comment",
    callback: (nftId: string) => {
      toast({
        title: "Your have commented successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        variant: "left-accent",
      });
    },
  },
];

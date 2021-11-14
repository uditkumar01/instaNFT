import { Dispatch } from "react";
import { likeNft } from "../Firestore/nft/like/like";

export const likeHandler = async ({
  nftId,
  userId,
  likeCallback,
  unLikeCallback,
  toast,
}: any): Promise<void> => {
  console.log("likeHandler", nftId, typeof toast);

  if (userId) {
    const res = await likeNft(nftId, userId);
    if (res?.success) {
      if (res?.liked) {
        const { likeId } = res;
        likeCallback(likeId, nftId);
        toast({
          title: "Added to your favorites",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "left-accent",
        });
      } else {
        const { likeId } = res;
        unLikeCallback(likeId, nftId);
        toast({
          title: "Removed from your favorites",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "left-accent",
        });
      }
    } else {
      toast({
        title: "Error",
        description: res?.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  } else {
    toast({
      title: "Error",
      description: "You need to be logged in to like an NFT",
      status: "error",
      duration: 5000,
      isClosable: true,
      variant: "left-accent",
    });
  }
};

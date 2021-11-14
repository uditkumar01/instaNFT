import { INFT } from "../Firestore/nft/addNfts";

export const isLiked = (userId?: string, nft?: INFT | null): boolean => {
  if (!nft?.uid || !userId || !nft?.likes) return false;
  return nft?.likes.includes(`${nft?.uid}_like_${userId}`);
};

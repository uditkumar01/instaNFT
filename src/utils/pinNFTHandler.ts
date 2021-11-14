import { Dispatch } from "react";
import { IUser } from "../context/Auth/Auth";
import { IAuthAction } from "../context/Auth/AuthReducer";
import { pinNFT } from "./Firestore/nft/pinNFT";

export const pinNFTHandler = async ({
  authDispatch,
  owner,
  toast,
  uid,
}: {
  toast: any;
  uid: string;
  owner: IUser;
  authDispatch: Dispatch<IAuthAction>;
}): Promise<void> => {
  if (typeof owner === "string") {
    toast({
      title: "Error",
      description: "You can't pin this NFT",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }
  const resPinned = await pinNFT(uid, owner?.uid);
  if (resPinned.success) {
    authDispatch({
      type: "SET_PINNED_NFT",
      payload: resPinned?.alreadyPinned ? "" : uid,
    });
    toast({
      description: resPinned?.alreadyPinned
        ? "NFT has been unpinned from your profile"
        : "NFT has been pinned to your profile",
      status: "success",
      duration: 5000,
      isClosable: true,
      variant: "left-accent",
    });
  } else {
    toast({
      title: "NFT Pin Failed",
      description: "Something went wrong while pinning NFT",
      status: "error",
      duration: 5000,
      isClosable: true,
      variant: "left-accent",
    });
  }
};

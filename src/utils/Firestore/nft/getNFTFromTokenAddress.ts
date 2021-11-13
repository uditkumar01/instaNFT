import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { getUser } from "../user/getUser";
import { INFT } from "./addNfts";

export const getNFTFromTokenAddress = async (
  tokenAddress: string,
  tokenId: string
): Promise<
  | {
      success: true;
      nft: INFT;
    }
  | {
      success: false;
      error: string;
    }
> => {
  if (!tokenAddress || !tokenId) {
    return {
      success: false,
      error: "tokenAddress or tokenId is not defined",
    };
  }
  try {
    const nftRef = firestore()
      .collection("nfts")
      .where("tokenAddress", "==", tokenAddress)
      .where("tokenId", "==", tokenId);
    const nftSnapshot = await nftRef.get();
    if (!nftSnapshot.empty) {
      const nft = nftSnapshot.docs[0].data() as INFT;
      const user = await getUser(nft.owner as string);
      if (user.success) {
        nft.owner = user.user;
      }
      return {
        success: true,
        nft: { ...nft, uid: nftSnapshot.docs[0].id },
      };
    }
    return {
      success: false,
      error: "NFT not found",
    };
  } catch (error: any) {
    errorHandler(error, "getNFTFromTokenAddress.ts -> line 47");
    return {
      success: false,
      error: error.message,
    };
  }
};

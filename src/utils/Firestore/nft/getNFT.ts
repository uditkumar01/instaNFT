import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { getUser } from "../user/getUser";
import { INFT } from "./addNfts";

export const getNFT = async (
  nftUid?: string
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
  if (!nftUid) {
    return {
      success: false,
      error: "No NFT UID provided",
    };
  }
  try {
    const nftRef = firestore().collection("nfts").doc(nftUid);
    const nftSnapshot = await nftRef.get();
    if (nftSnapshot.exists) {
      const nft = nftSnapshot.data() as INFT;
      const user = await getUser(nft.owner as string);
      if (user.success) {
        nft.owner = user.user;
      }
      return {
        success: true,
        nft: { ...nft, uid: nftSnapshot.id },
      };
    }
    return {
      success: false,
      error: "NFT not found",
    };
  } catch (error: any) {
    errorHandler(error, "getNFT.ts -> line 43");
    return {
      success: false,
      error: error.message,
    };
  }
};

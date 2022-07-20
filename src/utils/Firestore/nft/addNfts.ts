import { IUser } from "../../../context/Auth/Auth";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export interface INFT {
  uid?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string[];
  commentCount?: number;
  tokenId: string;
  assetUrl: string;
  name: string;
  description: string;
  tokenAddress: string;
  ownedBy: string;
  chain: string;
  owner: string | IUser;
  metadata: any;
  createdAt: string;
}
export const addNfts = async (
  nfts: INFT[] | undefined
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  if (!nfts) return { error: "No nfts to add", success: false };
  try {
    const nftCollection = firestore().collection("nfts");
    await Promise.all(
      nfts.map(async (nft: INFT) => {
        // INFO: check if nft already exists before adding
        const nftDoc = await nftCollection
          .where("tokenId", "==", nft.tokenId)
          .where("tokenAddress", "==", nft.tokenAddress)
          .where("chain", "==", nft.chain)
          .get();

        if (nftDoc.empty) {
          await nftCollection.add(nft);
        }
      })
    );
    return { success: true };
  } catch (error: any) {
    errorHandler(error, "addNfts.ts -> line 44");
    return {
      error: error.message,
      success: false,
    };
  }
};

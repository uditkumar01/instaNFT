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
  // TODO: add nfts to firestore
  if (!nfts) return { error: "No nfts to add", success: false };
  try {
    const nftCollection = firestore().collection("nfts");
    // for (const nft of nfts) {
    //   await nftCollection.add(nft);
    // }
    await Promise.all(
      nfts.map(async (nft: INFT) => {
        await nftCollection.add(nft);
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

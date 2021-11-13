import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { INFT } from "./addNfts";

export const getNftsImages = async (
  nftUids: string[]
): Promise<
  | {
      success: true;
      images: string[];
    }
  | {
      success: false;
      error: string;
    }
> => {
  if (!nftUids?.length) {
    return {
      success: true,
      images: [],
    };
  }
  try {
    const nftRef = firestore()
      .collection("nfts")
      .where(firestore.FieldPath.documentId(), "in", nftUids);

    const nftSnapshot = await nftRef.get();
    if (!nftSnapshot.empty) {
      const nftImages = nftSnapshot.docs.map((doc) => {
        const data = doc.data() as INFT;
        return data.assetUrl;
      });
      return {
        success: true,
        images: nftImages,
      };
    }
    return {
      success: false,
      error: "NFT not found",
    };
  } catch (error: any) {
    errorHandler(error, "getNftsImages.ts -> line 39");
    return {
      success: false,
      error: error.message,
    };
  }
};

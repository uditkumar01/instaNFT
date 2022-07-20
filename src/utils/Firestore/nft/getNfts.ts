import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { getUser } from "../user/getUser";
import { INFT } from "./addNfts";

// fetch nfts from firebase with pagination
export const getNfts = async (
  page: number,
  limit: number,
  orderBy: string,
  order: "desc" | "asc"
): Promise<
  | {
      nftRes: INFT[];
      total: number;
      success: true;
    }
  | {
      error: string;
      success: false;
    }
> => {
  console.log("getNfts.ts -> line 30", page, limit, orderBy, order);
  try {
    const nfts = await firestore()
      .collection("nfts")
      .orderBy(orderBy, order)
      .startAfter(page * limit)
      .limit(limit)
      .get();

    const nftArray: INFT[] = [];

    // for (const doc of nfts?.docs) {
    //   const nft = { ...doc.data(), uid: doc.id } as INFT;
    //   const user = await getUser(nft.owner as string);
    //   nft.owner = user?.user || nft.owner;
    //   nftArray.push(nft);
    // }

    await Promise.all(
      nfts?.docs?.map(async (doc) => {
        const nft = { ...doc.data(), uid: doc.id } as INFT;
        const user = await getUser(nft.owner as string);
        if (user.success) {
          nft.owner = user.user;
        }
        nftArray.push(nft);
      })
    );

    console.log("getNfts.ts -> line 50", nftArray, nfts.size);

    return {
      nftRes: nftArray,
      total: nfts.size,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "getNfts.ts -> line 57");
    return {
      error: error.message,
      success: false,
    };
  }
};

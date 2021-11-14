import { INFT } from "../nft/addNfts";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { getNFT } from "../nft/getNFT";
import { getUser } from "../user/getUser";
import { ICollection } from "../../../pages/u/reducer/collectionReducer";

export const getCollection = async (
  collectionId: string
): Promise<
  | {
      success: true;
      collection: ICollection;
      nfts: INFT[];
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const collection = await firestore()
      .collection("collections")
      .doc(collectionId)
      .get();

    const collectionData = {
      ...collection.data(),
      uid: collection.id,
    } as ICollection;

    if (!collectionData) {
      return {
        success: false,
        error: "Collection not found",
      };
    }

    const ownerRes = await getUser(collectionData?.owner as string);
    if (ownerRes.success) {
      collectionData.owner = ownerRes.user;
    }

    const collectionItems = await Promise.all(
      collectionData.items.map(async (itemId: string) => {
        const itemRes = await getNFT(itemId);
        if (itemRes.success) {
          return itemRes.nft;
        }
        return {} as INFT;
      })
    );
    return {
      success: true,
      collection: collectionData,
      nfts: collectionItems,
    };
  } catch (error: any) {
    errorHandler(error, "getCollection.ts -> line: 7");
    return {
      success: false,
      error: error.message,
    };
  }
};

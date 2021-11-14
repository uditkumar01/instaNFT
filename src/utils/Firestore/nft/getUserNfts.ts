import firebase from "firebase/app";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { getUser } from "../user/getUser";
import { INFT } from "./addNfts";

// fetch nfts from firebase with pagination
export const getUserNfts = async (
  limit: number,
  orderBy: string,
  order: "desc" | "asc",
  username: string,
  // eslint-disable-next-line max-len
  lastDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Promise<
  | {
      nftRes: INFT[];
      total: number;
      // eslint-disable-next-line max-len
      lastDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    // saving query to variable for pagination using startAfter

    let query;
    if (!lastDoc) {
      query = firestore()
        .collection("nfts")
        .where("owner", "==", username)
        .orderBy(firestore.FieldPath.documentId(), "desc")
        .limit(limit);
    } else {
      query = firestore()
        .collection("nfts")
        .where("owner", "==", username)
        .orderBy(firestore.FieldPath.documentId(), "desc")
        .startAfter(lastDoc)
        .limit(limit);
    }
    const nfts = await query.get();

    // : INFT[] = [];

    const nftArray = await Promise.all(
      nfts?.docs?.map(async (doc) => {
        const nft = { ...doc.data(), uid: doc.id } as INFT;
        const user = await getUser(nft.owner as string);
        if (user.success) {
          nft.owner = user.user;
        }
        return nft;
      })
    );

    return {
      nftRes: nftArray,
      total: nfts.size || 0,
      lastDoc: nfts.docs[nfts.docs.length - 1],
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "getUserNfts.ts -> line 60");
    return {
      error: error.message,
      success: false,
    };
  }
};

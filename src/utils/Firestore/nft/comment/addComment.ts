import { IUser } from "../../../../context/Auth/Auth";
import { firestore } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";
import { INFT } from "../addNfts";

export interface IComment {
  uid: string;
  comment: string;
  user: string | IUser;
  nft: string | INFT;
  createdAt: string;
  likeCount?: number;
}

export const addComment = async (
  nftId: string,
  comment: string,
  userId: string
): Promise<
  | {
      comment: IComment;
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const currentDate = new Date();
    const commentRef = await firestore().collection("comments").add({
      comment,
      user: userId,
      nft: nftId,
      createdAt: currentDate.toISOString(),
    });
    const nftRef = firestore().collection("nfts").doc(nftId);
    const nft = await nftRef.get();
    if (nft.exists) {
      await nftRef.update({
        commentCount: firestore.FieldValue.increment(1),
        comments: firestore.FieldValue.arrayUnion(commentRef.id),
      });
    } else {
      throw new Error("NFT does not exist");
    }
    return {
      comment: {
        comment,
        user: userId,
        nft: nftId,
        createdAt: currentDate.toISOString(),
        uid: commentRef.id,
      },
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "addComment.ts -> line 45");
    return {
      success: false,
      error: error.message,
    };
  }
};

import { firestore } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";

interface ILike {
  uid?: string;
  userId: string;
  nftId: string;
  createdAt: string;
}

export const likeNft = async (
  nftUid: string,
  userUid: string
): Promise<
  | { success: true; liked: boolean; likeId: string }
  | { success: false; error: string }
> => {
  try {
    const nftRef = firestore().collection("nfts").doc(nftUid);
    const nftSnapshot = await nftRef.get();
    if (!nftSnapshot.exists) {
      return { success: false, error: "NFT does not exist" };
    }
    const nftData = nftSnapshot.data();
    if (!nftData) {
      return { success: false, error: "NFT does not exist" };
    }

    const likeRef = firestore()
      .collection("likes")
      .where("nftId", "==", nftUid)
      .where("userId", "==", userUid);
    const likeSnapshot = await likeRef.get();

    const alreadyLiked = likeSnapshot.docs.length > 0;
    if (alreadyLiked) {
      const likeId = likeSnapshot.docs[0].id;
      await likeSnapshot.docs[0].ref.delete();
      console.log("unliked", likeId);
      await nftRef.update({
        likes: firestore.FieldValue.arrayRemove(likeId),
        likeCount: firestore.FieldValue.increment(-1),
      });
      return { success: true, liked: false, likeId };
    }

    const likeId = `${nftUid}_like_${userUid}`;
    const like: ILike = {
      userId: userUid,
      nftId: nftUid,
      createdAt: new Date().toISOString(),
    };

    await firestore().collection("likes").doc(likeId).set(like);
    await nftRef.update({
      likes: firestore.FieldValue.arrayUnion(likeId),
      likeCount: firestore.FieldValue.increment(1),
    });

    return { success: true, liked: true, likeId };
  } catch (error: any) {
    errorHandler(error, "like.ts -> line 34");
    return { success: false, error: error.message };
  }
};

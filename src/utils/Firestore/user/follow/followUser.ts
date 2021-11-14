import { IUser } from "../../../../context/Auth/Auth";
import { firestore } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";

export const followOrUnfollowUser = async (
  userId: string,
  currentUserId: string
): Promise<
  | {
      success: true;
      alreadyFollowing: boolean;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const userRef = firestore().doc(`users/${userId}`);
    const currentUserRef = firestore().doc(`users/${currentUserId}`);
    const userSnapshot = await userRef.get();
    const currentUserSnapshot = await currentUserRef.get();

    if (!userSnapshot.exists || !currentUserSnapshot.exists) {
      throw new Error("User not found");
    }

    const user = userSnapshot.data() as IUser;
    let alreadyFollowing = false;

    user.followers.forEach((followerUid) => {
      if (followerUid === currentUserId) {
        alreadyFollowing = true;
      }
    });

    if (alreadyFollowing) {
      await userRef.update({
        followers: firestore.FieldValue.arrayRemove(currentUserId),
      });
      await currentUserRef.update({
        following: firestore.FieldValue.arrayRemove(userId),
      });
    } else {
      await userRef.update({
        followers: firestore.FieldValue.arrayUnion(currentUserId),
      });
      await currentUserRef.update({
        following: firestore.FieldValue.arrayUnion(userId),
      });
    }

    return {
      success: true,
      alreadyFollowing,
    };
  } catch (error: any) {
    errorHandler(error, "followOrUnfollowUser.ts -> line 59");
    return {
      success: false,
      error: error.message,
    };
  }
};

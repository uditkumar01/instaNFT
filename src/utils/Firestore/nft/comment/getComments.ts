import { IUser } from "../../../../context/Auth/Auth";
import { firestore } from "../../../../Firebase";
import { IComment } from "./addComment";

export const getComments = async (
  commentsIds: string[]
): Promise<
  | {
      comments: IComment[];
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const commentsRef = firestore().collection("comments");
    const commentsData = await Promise.all(
      commentsIds.map(async (commentId) => {
        const commentRef = await commentsRef.doc(commentId).get();
        const commentData = commentRef.data() as IComment;
        let userData = {} as IUser;
        if (typeof commentData.user === "string") {
          const userRef = await firestore()
            .collection("users")
            .doc(commentData.user)
            .get();
          userData = userRef.data() as IUser;
        }

        return { ...commentData, uid: commentRef.id, user: userData };
      })
    );
    return {
      comments: commentsData,
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

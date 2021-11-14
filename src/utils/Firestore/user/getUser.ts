import { IUser } from "../../../context/Auth/Auth";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const getUser = async (
  uid?: string
): Promise<
  | {
      success: true;
      user: IUser;
    }
  | {
      success: false;
      error: string;
    }
> => {
  if (!uid) return { success: false, error: "No user id provided" };
  try {
    const snapshot = await firestore().collection("users").doc(uid).get();
    if (snapshot.exists) {
      return {
        success: true,
        user: { uid: snapshot.id, ...snapshot.data() } as IUser,
      };
    }
    return { success: false, error: "User not found" };
  } catch (error: any) {
    errorHandler(error, "getUser.ts -> line 26");
    return {
      success: false,
      error: error.message,
    };
  }
};

import { IUser } from "../../../context/Auth/Auth";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export async function getUserFromUsername(
  username: string | undefined
): Promise<
  | {
      success: true;
      user: IUser;
    }
  | {
      success: false;
      error: any;
    }
> {
  if (!username) return { success: false, error: "No username provided" };
  try {
    const snapshot = await firestore()
      .collection("users")
      .where("username", "==", username)
      .get();
    if (!snapshot.empty) {
      const user = snapshot.docs[0].data() as IUser;
      return {
        success: !snapshot.empty,
        user: { ...user, uid: snapshot.docs[0].id } as IUser,
      };
    }
    return { success: false, error: "User not found" };
  } catch (error: any) {
    errorHandler(error, "getUserFromUsername.ts -> line 32");
    return {
      success: false,
      error: error.message,
    };
  }
}

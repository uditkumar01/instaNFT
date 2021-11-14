import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const updateProfileData = async (
  uid: string | undefined,
  profileData: any
): Promise<{
  success: boolean;
  message: string;
}> => {
  if (!uid) return { success: false, message: "User not found" };

  try {
    if (profileData?.username) {
      const userRef = await firestore()
        .collection("users")
        .where("username", "==", profileData.username)
        .get();

      if (!userRef?.empty) {
        return {
          success: false,
          message: "Username already exists",
        };
      }
    }

    const userRef = firestore().doc(`users/${uid}`);
    await userRef.update(profileData);
    return {
      success: true,
      message: "Profile data updated successfully",
    };
  } catch (error: any) {
    errorHandler(error, "updateProfileData.ts -> line 20");
    return {
      success: false,
      message: error?.message,
    };
  }
};

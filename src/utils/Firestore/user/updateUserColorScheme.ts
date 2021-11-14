import { errorHandler } from "../../errorHandler";
import { firestore } from "../../../Firebase";

export const updateUserColorScheme = async (
  uid: string | undefined,
  colorScheme: string
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      error?: string;
    }
> => {
  if (!uid) return { success: false, error: "UID is not valid" };
  try {
    await firestore().collection("users").doc(uid).update({ colorScheme });
    return {
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "updateUserColorScheme.ts -> line: 23");
    return {
      success: false,
      error: error?.message,
    };
  }
};

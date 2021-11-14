import { auth } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";

export const emailSignOut = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error: any) {
    errorHandler(error, "emailSignOut.ts - line: 8");
  }
};

import { firebase, auth } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const signIn = async (): Promise<
  | {
      success: true;
      user: firebase.User | null;
    }
  | {
      error: string;
      success: false;
    }
> => {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await auth().signInWithPopup(provider);
    return { success: true, user: result.user };
  } catch (error: any) {
    errorHandler(error, "googleSignIn.ts -> line 20");
    return { error: error.message, success: false };
  }
};

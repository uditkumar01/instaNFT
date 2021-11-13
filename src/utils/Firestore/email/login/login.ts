import firebase from "firebase/app";
import { auth } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";

export const emailLogin = async (
  email: string,
  password: string
): Promise<
  | {
      success: true;
      user: firebase.auth.UserCredential;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);
    return {
      success: true,
      user,
    };
  } catch (error: any) {
    errorHandler(error, "emailLogin.ts -> line 24");
    return {
      success: false,
      error: error.message,
    };
  }
};

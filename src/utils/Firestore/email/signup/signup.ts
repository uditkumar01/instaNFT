import firebase from "firebase/app";
import { auth } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";

export const emailSignUp = async (
  email: string,
  password: string
): Promise<
  | {
      success: boolean;
      user: firebase.User | null;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
      user?: undefined;
    }
> => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    if (!user?.user?.emailVerified) {
      await user.user?.sendEmailVerification();
    }
    return {
      success: true,
      user: user.user,
    };
  } catch (error: any) {
    errorHandler(error, "emailSignUp.ts -> line 30");
    return {
      success: false,
      error: error.message,
    };
  }
};

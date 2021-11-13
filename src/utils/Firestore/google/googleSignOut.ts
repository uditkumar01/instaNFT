import { auth } from "../../../Firebase";

export const signOut = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await auth().signOut();
    }
    return { success: true };
  } catch (err: any) {
    console.log("signOut error", err.message, err);
    return { error: "something went wrong", success: false };
  }
};

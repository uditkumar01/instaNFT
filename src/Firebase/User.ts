import { firestore } from ".";
import { IUser } from "../context/Auth/Auth";
import { errorHandler } from "../utils/errorHandler";

export const createUserEntity = async (user: IUser): Promise<void> => {
  if (!user) return;
  // Get a reference to the location in the Firestore where the user
  // document may or may not exist and fetch user
  const userRef = firestore().doc(`users/${user?.uid}`);
  const snapshot = await userRef.get();
  const userData = snapshot.data();

  // if document does not exsist create a new user document
  if (!snapshot.exists) {
    try {
      await userRef.set(user);
    } catch (error: any) {
      errorHandler(error, "Firebase > User.ts -> line 19");
    }
  } else if (userData && user.emailVerified !== userData?.emailVerified) {
    try {
      await userRef.update({ emailVerified: user.emailVerified });
    } catch (error: any) {
      errorHandler(error, "Firebase > User.ts -> line 25");
    }
  }
};

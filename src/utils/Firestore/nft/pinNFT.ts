import { IUser } from "../../../context/Auth/Auth";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const pinNFT = async (
  nftUid?: string,
  userUid?: string
): Promise<
  | {
      success: true;
      alreadyPinned: boolean;
      nftUid: string;
    }
  | { success: false; error: string }
> => {
  if (!userUid || !nftUid) {
    return {
      success: false,
      error: "User or NFT UID is missing",
    };
  }
  try {
    const userRef = await firestore().collection("users").doc(userUid).get();
    if (!userRef.exists) {
      return {
        success: false,
        error: "User does not exist",
      };
    }
    const userData = userRef.data() as IUser;
    let alreadyPinned = false;
    if (userData?.pinnedNFT === nftUid) {
      alreadyPinned = true;
      await userRef.ref.update({ pinnedNFT: "" });
    } else {
      await userRef.ref.update({
        pinnedNFT: nftUid,
      });
    }
    return {
      success: true,
      alreadyPinned,
      nftUid,
    };
  } catch (error: any) {
    errorHandler(error, "firebase > pinNFT.ts -> line 29");
    return {
      success: false,
      error: error.message,
    };
  }
};

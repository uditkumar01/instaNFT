import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const deleteCollection = async (
  collectionId: string
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    await firestore().collection("collections").doc(collectionId).delete();
    return {
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "deleteCollection.ts -> line 21");
    return {
      success: false,
      error: error.message,
    };
  }
};

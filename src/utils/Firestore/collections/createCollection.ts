import { firestore } from "../../../Firebase";
import { ICollection } from "../../../pages/u/reducer/collectionReducer";
import { errorHandler } from "../../errorHandler";
import { addTags } from "./addTags";

// here collection refers to a collection of nfts
export const createCollection = async (
  userUid: string,
  collection: ICollection
): Promise<
  | {
      collection: ICollection;
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const currentDate = new Date().toISOString();
    const collectionId = `${collection.name
      .toLowerCase()
      .replace(/(\s){1,}/g, "_")}_${userUid}`;
    const collectionRef = firestore()
      .collection("collections")
      .doc(collectionId);

    const tagsIds = await addTags(
      userUid,
      collectionId,
      "collections",
      collection?.tags || []
    );

    if (!tagsIds?.success) {
      return {
        success: false,
        error: "Error adding tags",
      };
    }

    const payload = {
      ...collection,
      tags: tagsIds?.tags || [],
      owner: userUid,
      createdAt: currentDate,
    };
    await collectionRef.set(payload);
    return {
      collection: payload,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "createCollection.ts -> line 54");
    return {
      success: false,
      error: error.message,
    };
  }
};

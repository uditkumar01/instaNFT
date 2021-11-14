import { ICollection } from "../../../reducer/collectionReducer";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";
import { addTags } from "./addTags";
import { removeTags } from "./removeTags";

export const updateCollection = async (
  userUid: string,
  collectionId: string,
  payload: any
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
    const collectionRef = firestore()
      .collection("collections")
      .doc(collectionId);
    const collectionSnapshot = await collectionRef.get();

    if (!collectionSnapshot.exists) {
      return {
        success: false,
        error: "Collection does not exist",
      };
    }

    const collection = collectionSnapshot.data() as ICollection;

    if (!collection) {
      return {
        success: false,
        error: "Collection does not exist",
      };
    }

    const prevTags = collection.tags;
    const newTags = payload.tags as string[];

    const prevTagsSet = new Set(prevTags);
    const newTagsSet = new Set(newTags);

    const newAddedTags: string[] = [];
    const removedTags: string[] = [];

    newTagsSet.forEach((tag) => {
      if (!prevTagsSet.has(tag)) {
        newAddedTags.push(tag);
      }
    });

    prevTagsSet.forEach((tag) => {
      if (!newTagsSet.has(tag)) {
        removedTags.push(tag);
      }
    });

    await addTags(userUid, collectionId, "collections", newAddedTags);
    await removeTags(userUid, collectionId, "collections", newAddedTags);

    await collectionRef.update(payload);

    return {
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "updateCollection.ts -> line 28");
    return {
      success: false,
      error: error.message,
    };
  }
};

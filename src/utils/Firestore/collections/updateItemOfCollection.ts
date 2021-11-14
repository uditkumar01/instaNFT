import { ICollection } from "../../../reducer/collectionReducer";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const updateItemOfCollection = async (
  collectionId: string,
  itemId: string
): Promise<
  | {
      alreadyExists: boolean;
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
      throw new Error("Collection does not exist");
    }

    const collection = collectionSnapshot.data() as ICollection;
    const alreadyExists = collection.items.includes(itemId as any);
    if (alreadyExists) {
      collectionRef.update({
        items: firestore.FieldValue.arrayRemove(itemId),
      });
    } else {
      collectionRef.update({
        items: firestore.FieldValue.arrayUnion(itemId),
      });
    }

    return {
      alreadyExists,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "updateItemOfCollection.ts -> line 45");
    return {
      success: false,
      error: error.message,
    };
  }
};

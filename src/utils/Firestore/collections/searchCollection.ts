import { ICollection } from "../../../pages/u/reducer/collectionReducer";
import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const searchCollection = async (
  query: string
): Promise<
  | {
      success: true;
      collections: ICollection[];
    }
  | {
      error: string;
      success: false;
    }
> => {
  try {
    // doc.id start with tagIdInitialChars
    const collections = firestore()
      .collection("collections")
      .where("name", ">=", query)
      .where("name", "<=", `${query}\uf8ff`)
      .limit(10);

    const collectionsSnapshot = await collections.get();
    const collectionsArray = collectionsSnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data(),
      } as ICollection;
    });

    return {
      success: true,
      collections: collectionsArray,
    };
  } catch (error: any) {
    errorHandler(error, "searchCollection.ts -> line 33");
    return {
      error: error.message,
      success: false,
    };
  }
};

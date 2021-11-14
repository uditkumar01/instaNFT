import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const queryTags = async (
  query: string
): Promise<
  | {
      success: true;
      tags: string[];
    }
  | {
      error: string;
      success: false;
    }
> => {
  try {
    const tagIdInitialChars = `${query
      .toLowerCase()
      .replace(/(\s){1,}/g, "_")}`;
    // doc.id start with tagIdInitialChars
    const tags = firestore()
      .collection("tags")
      .where(firestore.FieldPath.documentId(), ">=", tagIdInitialChars)
      .where(
        firestore.FieldPath.documentId(),
        "<=",
        `${tagIdInitialChars}\uf8ff`
      )
      .limit(10);

    const tagsSnapshot = await tags.get();
    const tagsArray = tagsSnapshot.docs.map((doc) => doc.id);

    return {
      success: true,
      tags: tagsArray,
    };
  } catch (error: any) {
    errorHandler(error, "queryTags.ts -> line 17");
    return {
      error: error.message,
      success: false,
    };
  }
};

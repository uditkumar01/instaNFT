import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const removeTags = async (
  userUid: string,
  docId: string,
  key: string,
  tags: string[]
): Promise<
  | {
      tags: string[];
      success: true;
    }
  | {
      error: string;
      success: false;
    }
> => {
  const currentDate = new Date().toISOString();
  try {
    const tagRef = firestore().collection("tags");
    const tagsIds = await Promise.all(
      tags.map(async (tag) => {
        const tagId = `${tag.toLowerCase().replace(/(\s){1,}/g, "_")}`;
        // add tags on firestore
        const tagDoc = tagRef.doc(tagId);
        const tagSnapshot = await tagDoc.get();
        if (tagSnapshot.exists) {
          const tagData = tagSnapshot.data();
          if (!tagData?.[key]?.includes(docId)) {
            await tagDoc.update({
              [key]: firestore.FieldValue.arrayRemove(docId),
              updatedAt: currentDate,
            });
          }
        }

        return tagId;
      })
    );
    return {
      tags: tagsIds,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "removeTags.ts -> line 45");
    return {
      error: error.message,
      success: false,
    };
  }
};

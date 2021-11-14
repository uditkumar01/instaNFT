import { storage } from "../../Firebase";
import { errorHandler } from "../errorHandler";
import { deleteImage } from "./deleteImage";

export const uploadImage = async (
  file: File | null,
  fileName: string,
  folder: string,
  prevPhotoUrl?: string | undefined,
  uid?: string
): Promise<
  | {
      url: string;
      success: true;
    }
  | {
      error: string;
      success: false;
    }
> => {
  // deleting previous photo
  if (!file || !fileName) return { error: "No file", success: false };

  if (prevPhotoUrl && uid) {
    const prevFileNameMatches = prevPhotoUrl?.match(
      new RegExp(`${uid}.*(?=\\?)`)
    );
    if (prevFileNameMatches?.length) {
      await deleteImage(`${folder}/${prevFileNameMatches[0]}`);
    }
  }

  // uploading new image
  try {
    const res = await storage().ref(`${folder}/${fileName}`).put(file);
    const assetUrl = await res.ref.getDownloadURL();
    return {
      url: assetUrl,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "uploadImage.ts -> line: 42");
    return {
      error: error.message,
      success: false,
    };
  }
};

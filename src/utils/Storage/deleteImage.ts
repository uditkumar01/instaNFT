import { storage } from "../../Firebase";
import { errorHandler } from "../errorHandler";

export const deleteImage = async (
  fileName: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const imageRef = storage().ref(fileName);
    // if image exists
    await imageRef.delete();
    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error: any) {
    errorHandler(error, "deleteImage.ts -> line: 19");
    return {
      success: false,
      message: error.message,
    };
  }
};

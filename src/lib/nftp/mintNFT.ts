import { nftPortInstance } from ".";
import { errorHandler } from "../../utils/errorHandler";

export const mintNFT = async (
  payload: any
): Promise<
  { success: true; data: any } | { success: false; error: string }
> => {
  if (!payload) return { success: false, error: "No payload" };
  try {
    const url = "v0/mints/easy/urls";
    const response = await nftPortInstance.post(url, payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    errorHandler(error, "mintNFT.ts");
    return {
      success: false,
      error: error.message,
    };
  }
};

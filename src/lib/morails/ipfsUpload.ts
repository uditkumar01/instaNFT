import { moralisPortInstance } from ".";
import { errorHandler } from "../../utils/errorHandler";

export const ipfsUpload = async (
  metadata: Record<string, any>
): Promise<
  | {
      success: true;
      path: string;
    }
  | {
      error: string;
      success: false;
    }
> => {
  try {
    const url = "/ipfs/uploadFolder";
    const { data } = await moralisPortInstance.post(url, [
      {
        path: "instaNFT/metadata.json",
        content: metadata,
      },
    ]);
    return {
      success: true,
      path: (data as any)?.[0]?.path,
    };
  } catch (error: any) {
    errorHandler(error, "ipfsUpload.ts");
    return {
      success: false,
      error: error.message,
    };
  }
};

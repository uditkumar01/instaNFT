import { firestore } from "../../../Firebase";
import { errorHandler } from "../../errorHandler";

export const claimRewards = async (
  userId: string,
  trophy: string
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> => {
  const currentDate = new Date();
  try {
    const triphiesRef = firestore().collection("trophies");
    const payload = {
      claimed: true,
      claimedAt: currentDate.toISOString(),
      userId,
      trophy,
    };
    await triphiesRef.add(payload);

    return {
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "claimRewards");
    return {
      success: false,
      error: error.message,
    };
  }
};

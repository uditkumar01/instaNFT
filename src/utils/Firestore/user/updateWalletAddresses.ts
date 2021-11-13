import { errorHandler } from "../../errorHandler";
import { firestore } from "../../../Firebase";

export const updateWalletAddresses = async (
  addressChain:
    | "ethAddresses"
    | "polygonAddresses"
    | "tezosAddresses"
    | "solanaAddresses"
    | "avalancheAddresses",
  userId: string,
  userAddress: string
): Promise<
  | {
      success: true;
      key:
        | "ethAddresses"
        | "polygonAddresses"
        | "tezosAddresses"
        | "solanaAddresses"
        | "avalancheAddresses";
      addresses: string[];
      newAddress: string;
      alreadyExists: boolean;
    }
  | { success: false; error: string }
> => {
  const address = userAddress.toLowerCase();
  const addresses: any = {
    [addressChain]: [],
  };
  let alreadyExists = true;

  try {
    // Update the user's wallet if wallet if not already in the user's wallet
    const userRef = firestore().collection("users").doc(userId);
    const userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      const user = userSnapshot.data();
      addresses[addressChain] = user?.[addressChain] || [];

      if (!addresses[addressChain]?.includes(address)) {
        alreadyExists = false;
        addresses[addressChain].push(address);
        await userRef.update({
          [addressChain]: firestore.FieldValue.arrayUnion(address),
        });
      }
    }
    return {
      success: true,
      key: addressChain,
      addresses: addresses[addressChain],
      newAddress: address,
      alreadyExists,
    };
  } catch (err: any) {
    errorHandler(err, "updateWalletAddresses.ts -> line 58");
    return {
      success: false,
      error: err.message,
    };
  }
};

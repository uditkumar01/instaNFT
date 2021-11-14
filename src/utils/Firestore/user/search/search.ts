import firebase from "firebase/app";
import { IUser } from "../../../../context/Auth/Auth";
import { firestore } from "../../../../Firebase";
import { errorHandler } from "../../../errorHandler";
import { INFT } from "../../nft/addNfts";

const allSupportedWalletsKeys = [
  "ethAddresses",
  "tezosAddresses",
  "solanaAddresses",
  "polygonAddresses",
  "avalancheAddresses",
];

// const addressRegex = /^0x[a-fA-F0-9]{40}$/i;

function getDataFromSnapshot(
  type: string,
  snapshot: firebase.firestore.QuerySnapshot,
  allDocs: any[],
  duplicateIds: string[]
): void {
  snapshot.forEach((doc) => {
    if (!duplicateIds.includes(doc.id)) {
      allDocs.push({ ...doc.data(), uid: doc.id, queryType: type });
      duplicateIds.push(doc.id);
    }
  });
}

export const searchUsers = async (
  query: string
): Promise<
  | {
      success: true;
      users: IUser[];
      nfts: INFT[];
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const users = firestore().collection("users");

    const usersUsingUsername = await users
      // .orderBy("username")
      .where("username", ">=", query)
      .where("username", "<=", `${query}\uf8ff`)
      .limit(10)
      .get();

    const usersUsingEmail = await users
      // .orderBy("email")
      .where("email", ">=", query)
      .where("email", "<=", `${query}\uf8ff`)
      .limit(10)
      .get();

    const usersUsingDisplayName = await users
      .where("displayName", ">=", query)
      .where("displayName", "<=", `${query}\uf8ff`)
      .limit(10)
      .get();

    const nftUsingTokenAddress = await firestore()
      .collection("nfts")
      .where("tokenAddress", ">=", query)
      .where("tokenAddress", "<=", `${query}\uf8ff`)
      .limit(10)
      .get();

    const nftUsingName = await firestore()
      .collection("nfts")
      .where("name", ">=", query)
      .where("name", "<=", `${query}\uf8ff`)
      .limit(10)
      .get();

    // search user address in array of addresses

    const usersUsingAddress = await Promise.all(
      allSupportedWalletsKeys.map(async (walletKey) => {
        const walletAddressResults = await users
          .where(walletKey, "array-contains", query)
          .limit(10)
          .get();
        return walletAddressResults;
      })
    );

    const [
      usersUsingUsernameResults,
      usersUsingEmailResults,
      usersUsingDisplayNameResults,
      usersUsingAddressResults,
      nftUsingTokenAddressResults,
      nftUsingNameResults,
    ] = await Promise.all([
      usersUsingUsername,
      usersUsingEmail,
      usersUsingDisplayName,
      usersUsingAddress,
      nftUsingTokenAddress,
      nftUsingName,
    ]);

    const searchResults: IUser[] = [];
    const duplicateUserIds: string[] = []; // for deduplication

    getDataFromSnapshot(
      "user",
      usersUsingUsernameResults,
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingEmailResults,
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingDisplayNameResults,
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingAddressResults[0],
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingAddressResults[1],
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingAddressResults[2],
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingAddressResults[3],
      searchResults,
      duplicateUserIds
    );
    getDataFromSnapshot(
      "user",
      usersUsingAddressResults[4],
      searchResults,
      duplicateUserIds
    );

    const nftResults: INFT[] = [];
    const nftDuplicateIds: string[] = [];
    getDataFromSnapshot(
      "nft",
      nftUsingTokenAddressResults,
      nftResults,
      nftDuplicateIds
    );
    getDataFromSnapshot(
      "nft",
      nftUsingNameResults,
      nftResults,
      nftDuplicateIds
    );

    return {
      success: true,
      users: searchResults,
      nfts: nftResults,
    };
  } catch (error: any) {
    errorHandler(error, "searchUsers.ts -> line 103");
    return {
      success: false,
      error: error.message,
    };
  }
};

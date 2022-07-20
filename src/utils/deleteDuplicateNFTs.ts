// import { firestore } from "../Firebase";
// export const deleteDuplicateNFTs = async () => {
//   // get all nfts
//   const nftCollection = firestore().collection("nfts");
//   console.log("deleteDuplicateNFTs -> loading");

//   const removeNFT = async (nft: any) => {
//     const nftData = nft.data();
//     // delete all nfts with the same tokenId and tokenAddress
//     const nftsWithSameTokenIdAndTokenAddress = await nftCollection
//       .where("tokenId", "==", nftData.tokenId)
//       .where("tokenAddress", "==", nftData.tokenAddress)
//       .get();
//     if (
//       !nftsWithSameTokenIdAndTokenAddress.empty &&
//       nftsWithSameTokenIdAndTokenAddress.size > 1
//     ) {
//       await Promise.all(
//         nftsWithSameTokenIdAndTokenAddress.docs.slice(1).map(async (nft) => {
//           const d = nft.data();
//           console.log("deleteDuplicateNFTs -> deleting", d.tokenId, d.name);
//           await nft.ref.delete();
//         })
//       );
//     } else {
//       console.log(
//         "deleteDuplicateNFTs -> no duplicates found",
//         nftData.tokenId,
//         nftData.name
//       );
//     }
//   };

//   const nfts = await nftCollection.get();

//   for (const nft of nfts.docs) {
//     await removeNFT(nft);
//   }

//   console.log("deleteDuplicateNFTs -> done");
// };

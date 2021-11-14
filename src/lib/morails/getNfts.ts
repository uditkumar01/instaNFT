/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";
import { moralisPortInstance } from ".";
import { errorHandler } from "../../utils/errorHandler";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { getSingleLevelObject } from "../../utils/getSingleLevelObject";
import { isImage } from "../../utils/isImage";

export const getNFTs = async (
  accountAddress: string | undefined,
  chain: "polygon" | "avalanche" | "eth",
  owner: string
): Promise<
  { nfts: Array<INFT>; success: true } | { error: string; success: false }
> => {
  if (!accountAddress) return { error: "No account address", success: false };

  const url = `${accountAddress}/nft?chain=${chain}&format=decimal`;
  try {
    const { data } = await moralisPortInstance.get(url);
    const { result } = data as any;
    // if (!data?.length) {
    //   return [];
    // }

    const allNFTS = [];
    for (let i = 0; i < result.length; i += 1) {
      const nft = result[i];
      let metaData: any = {};
      if (nft?.metadata) {
        metaData = JSON.parse(nft.metadata);
      }
      if (nft.token) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const metaDataRes = await axios.get(nft.token_uri);
          metaData = { ...metaData, ...metaDataRes };
        } catch (error: any) {
          errorHandler(error, "getNFTs > resolving token URI -> line 38");
        }
      }

      const { name, description } = metaData;
      const {
        token_id,
        name: contractName,
        token_address,
        description: nftDesc,
      } = nft;

      delete nft.token_uri;
      delete nft.metadata;
      delete nft.name;
      delete nft.description;
      delete nft.token_id;
      delete nft.owner_of;
      delete nft.token_address;
      delete metaData.name;
      delete metaData.description;

      getSingleLevelObject(nft);
      getSingleLevelObject(metaData);
      const nftData = {
        likes: [],
        likeCount: 0,
        comments: [],
        commentCount: 0,
        tokenId: token_id || "",
        tokenAddress: token_address?.toLowerCase() || "",
        name: name?.toLowerCase() || contractName?.toLowerCase() || "",
        ownedBy: accountAddress || "",
        description: description || nftDesc || "",
        assetUrl: metaData?.image || "",
        owner,
        chain,
        createdAt: new Date().toISOString(),
        metadata: {
          ...nft,
          ...metaData,
        },
      };

      if (!nftData?.assetUrl) {
        // checking which value is image url
        const asset_url = Object.values(nftData?.metadata || {}).find(
          (value: any) => isImage(value)
        );
        const assetUrl = asset_url;
        if (assetUrl) {
          allNFTS.push({
            ...nftData,
            assetUrl: assetUrl || "",
          });
        }
      } else {
        allNFTS.push(nftData);
      }
    }

    return {
      success: true,
      nfts: allNFTS,
    };
  } catch (error: any) {
    errorHandler(error, "getNFTs morails error -> line 92");
    return {
      success: false,
      error: error.message,
    };
  }
};

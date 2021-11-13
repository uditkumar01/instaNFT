/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { nftPortInstance } from ".";
import { errorHandler } from "../../utils/errorHandler";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { generatePinataLink } from "../../utils/generatePinataLink";

export async function getNfts(
  accountAddress: string | undefined,
  chain: "ethereum" | "tezos",
  owner: string
): Promise<
  { nfts: Array<INFT>; success: true } | { error: string; success: false }
> {
  if (!accountAddress) return { error: "No account address", success: false };

  const url = `/account/${accountAddress}/nfts?chain=${chain}&include=default`;
  try {
    const res = await nftPortInstance.get(url);
    const { data } = res as any;
    if (!data?.nfts) {
      return { error: "No nfts found", success: false };
    }
    const nfts = data?.nfts.map((nft: any) => {
      const { token_id, name, description, asset_url, contract_address } = nft;
      delete nft.asset_url;
      delete nft.contract_address;
      delete nft.token_id;
      return {
        tokenId: token_id,
        assetUrl: generatePinataLink(asset_url),
        likes: 0,
        name: name?.toLowerCase(),
        description,
        tokenAddress: contract_address?.toLowerCase(),
        ownedBy: accountAddress,
        owner,
        chain,
        createdAt: new Date().toISOString(),
        metadata: {
          ...nft,
        },
      };
    });
    return {
      nfts,
      success: true,
    };
  } catch (error: any) {
    errorHandler(error, "getNfts nftport -> line 47");
    return {
      error: error.message,
      success: false,
    };
  }
}

import { INFT } from "../utils/Firestore/nft/addNfts";

export interface IInitialNftsState {
  nfts: INFT[];
  loading: boolean;
  hasMore: boolean;
}

export const INITIAL_NFT_STATE: IInitialNftsState = {
  nfts: [],
  loading: false,
  hasMore: true,
};

export function nftReducer(
  state: IInitialNftsState,
  action: any
): IInitialNftsState {
  switch (action.type) {
    case "RESET":
      return {
        ...INITIAL_NFT_STATE,
      };
    case "SET_NFTS":
      return {
        ...state,
        nfts: [...state.nfts, ...action.payload],
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      };
    case "ADD_NFT":
      return {
        ...state,
        nfts: [...state.nfts, action.payload],
      };
    case "REMOVE_NFT":
      return {
        ...state,
        nfts: state.nfts.filter((nft: INFT) => nft.tokenId !== action.payload),
      };
    case "LIKE_NFT":
      return {
        ...state,
        nfts: state.nfts.map((nft: INFT) => {
          if (nft.uid === action.payload.nftId) {
            return {
              ...nft,
              likes: [...(nft.likes || []), action.payload.likeId],
              likeCount: (nft?.likeCount || 0) + 1,
            };
          }
          return nft;
        }),
      };
    case "UNLIKE_NFT":
      return {
        ...state,
        nfts: state.nfts.map((nft: INFT) => {
          if (nft.uid === action.payload.nftId) {
            return {
              ...nft,
              likes: (nft?.likes || []).filter(
                (likeId: string) => likeId !== action.payload.likeId
              ),
              likeCount: (nft?.likeCount || 0) - 1,
            };
          }
          return nft;
        }),
      };
    default:
      return state;
  }
}

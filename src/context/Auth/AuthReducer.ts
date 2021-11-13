import { IAuthContext } from "./Auth";

export interface IAuthAction {
  type: string;
  payload: any;
}

export function authReducer(state: IAuthContext, action: IAuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_PINNED_NFT":
      return {
        ...state,
        user: {
          ...state.user,
          pinnedNFT: action.payload,
        },
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_FOLLOWING":
      return {
        ...state,
        user: {
          ...state.user,
          following: action.payload,
        },
      };
    case "SET_ETH_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          ethAddresses: [...(state?.user?.ethAddresses || []), action.payload],
        },
      };
    case "SET_POLYGON_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          polygonAddresses: [
            ...(state?.user?.polygonAddresses || []),
            action.payload,
          ],
        },
      };
    case "SET_SOLANA_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          solanaAddresses: [
            ...(state?.user?.solanaAddresses || []),
            action.payload,
          ],
        },
      };
    case "SET_AVALANCHE_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          avalancheAddresses: [
            ...(state?.user?.avalancheAddresses || []),
            action.payload,
          ],
        },
      };
    case "SET_TEZOS_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          tezosAddresses: [
            ...(state?.user?.tezosAddresses || []),
            action.payload,
          ],
        },
      };
    case "SET_ETH_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          ethAddresses: action.payload,
        },
      };
    case "SET_POLYGON_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          polygonAddresses: action.payload,
        },
      };
    case "SET_SOLANA_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          solanaAddresses: action.payload,
        },
      };
    case "SET_AVALANCHE_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          avalancheAddresses: action.payload,
        },
      };
    case "SET_TEZOS_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          tezosAddresses: action.payload,
        },
      };
    default:
      return state;
  }
}

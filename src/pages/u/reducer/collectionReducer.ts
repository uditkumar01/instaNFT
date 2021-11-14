import { Dispatch } from "react";
import { IUser } from "../../../context/Auth/Auth";

export interface ICollection {
  uid?: string;
  name: string;
  items: string[];
  tags: string[];
  owner: string | IUser;
  images?: string[];
  createdAt?: string;
}

interface IActionSetCollections {
  type: "SET_COLLECTIONS";
  payload: ICollection[];
}

interface IActionAddCollection {
  type: "ADD_COLLECTION";
  payload: ICollection;
}

interface IActionSetLoading {
  type: "SET_LOADING";
  payload: boolean;
}

interface IActionAddItemToCollection {
  type: "UPDATE_ITEM_OF_COLLECTION";
  payload: {
    collectionId: string;
    itemId: string;
    image?: string;
  };
}

interface IActionDeleteCollection {
  type: "DELETE_COLLECTION";
  payload: string;
}

interface IActionUpdateCollection {
  type: "UPDATE_COLLECTION";
  payload: {
    collectionId: string;
    payload: any;
  };
}

interface IActionSetHasMore {
  type: "SET_HAS_MORE";
  payload: boolean;
}

export type ICollectionAction =
  | IActionSetCollections
  | IActionAddCollection
  | IActionSetLoading
  | IActionAddItemToCollection
  | IActionDeleteCollection
  | IActionUpdateCollection
  | IActionSetHasMore;

export interface ICollectionContext {
  collections: ICollection[];
  loading: boolean;
  hasMore: boolean;
}

export interface ICollectionContextValue extends ICollectionContext {
  collectionDispatch: Dispatch<ICollectionAction>;
}

export const INITIAL_COLLECTION_STATE: ICollectionContext = {
  collections: [],
  loading: false,
  hasMore: true,
};

export function collectionReducer(
  state: ICollectionContext,
  action: ICollectionAction
): ICollectionContext {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return {
        ...state,
        collections: [...(state?.collections || []), ...action.payload],
        loading: false,
      };

    case "ADD_COLLECTION":
      return {
        ...state,
        collections: [...state.collections, action.payload],
        loading: false,
      };

    case "UPDATE_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (collection.uid === action.payload.collectionId) {
            return {
              ...collection,
              ...action.payload.payload,
            };
          }
          return collection;
        }),
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "UPDATE_ITEM_OF_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (collection.uid === action.payload.collectionId) {
            const isPresent = collection.items.includes(action.payload.itemId);
            let newImages = collection?.images || [];
            const imagePayload = action.payload.image;
            if (imagePayload && newImages.length < 25) {
              if (!isPresent) {
                newImages = [...newImages, imagePayload];
              } else {
                newImages = newImages?.filter(
                  (image) => image !== imagePayload
                );
              }
            }
            return {
              ...collection,
              items: isPresent
                ? collection.items.filter(
                    (item: string) => item !== action.payload.itemId
                  )
                : [...collection.items, action.payload.itemId],
              images: newImages,
            };
          }
          return collection;
        }),
      };
    case "DELETE_COLLECTION":
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection.uid !== action.payload
        ),
      };

    case "SET_HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      };
    default:
      return state;
  }
}

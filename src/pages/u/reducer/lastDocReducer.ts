import firebase from "firebase/app";
/* eslint-disable max-len */
// this reducer is for lastDoc useReducer which will store lastDocs of differents data collections, for pagination

export const INITIAL_LAST_DOC_STATE = {
  nfts: undefined,
  collections: undefined,
  likedNfts: undefined,
};

type FirebaseDocType =
  | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  | undefined;

interface IInitialLastDocState {
  nfts: FirebaseDocType;
  collections: FirebaseDocType;
  likedNfts: FirebaseDocType;
}

interface IActionSetLastDoc {
  type: string;
  payload: {
    collectionName: string;
    lastDoc: FirebaseDocType;
  };
}

export type IActionLastDoc = IActionSetLastDoc;

export function lastDocReducer(
  state: IInitialLastDocState,
  action: IActionLastDoc
): IInitialLastDocState {
  switch (action.type) {
    case "SET_LAST_DOC":
      return {
        ...state,
        [action.payload.collectionName]: action.payload.lastDoc,
      };
    default:
      return state;
  }
}

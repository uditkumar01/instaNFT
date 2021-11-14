import { Dispatch } from "react";
import { IUser } from "../../context/Auth/Auth";
import {
  ICollection,
  ICollectionAction,
} from "../../reducer/collectionReducer";
import { createCollection } from "../Firestore/collections/createCollection";

export const createCollectionHandler = async (
  toast: any,
  collectionDispatch: Dispatch<ICollectionAction>,
  user: IUser | null,
  tags: string[],
  inputValue?: string,
  collectionId?: string
): Promise<void> => {
  if (!inputValue || !user?.uid) return;

  const collectionPayload: ICollection = {
    name: inputValue
      ?.trim()
      ?.toLowerCase()
      .replace(/(\s){2,}/g, " "),
    tags,
    items: [],
    owner: user.uid,
  };
  const collectionRes = await createCollection(user?.uid, collectionPayload);
  if (collectionRes?.success) {
    collectionDispatch({
      type: "ADD_COLLECTION",
      payload: { ...collectionRes.collection, owner: user },
    });
    toast({
      description: "Collection created successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
    });
  } else {
    toast({
      description: "Error creating collection",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
    });
  }
};

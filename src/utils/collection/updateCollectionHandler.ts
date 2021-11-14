import { Dispatch } from "react";
import { IUser } from "../../context/Auth/Auth";
import { ICollectionAction } from "../../reducer/collectionReducer";
import { updateCollection } from "../Firestore/collections/updateCollection";

export const updateCollectionHandler = async (
  toast: any,
  collectionDispatch: Dispatch<ICollectionAction>,
  user: IUser | null,
  tags: string[],
  inputValue?: string,
  collectionId?: string,
  onSuccessCallback?: any
): Promise<void> => {
  if (!inputValue || !user?.uid) return;

  const collectionPayload = {
    name: inputValue,
    tags,
  };
  const collectionRes = await updateCollection(
    user?.uid,
    collectionId || "",
    collectionPayload
  );
  if (collectionRes?.success) {
    const updatePayload = {
      collectionId: collectionId || "",
      payload: collectionPayload,
    };
    collectionDispatch({
      type: "UPDATE_COLLECTION",
      payload: updatePayload,
    });
    if (onSuccessCallback) onSuccessCallback(collectionPayload);
    toast({
      description: "Collection updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
    });
  } else {
    toast({
      description: "Error while updating collection",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
    });
  }
};

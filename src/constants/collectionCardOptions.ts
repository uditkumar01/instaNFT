/* eslint-disable max-len */
import { SingletonRouter } from "next/router";
import { Dispatch } from "react";
import { ICollectionAction } from "../pages/u/reducer/collectionReducer";
import { deleteCollection } from "../utils/Firestore/collections/deleteCollection";
import { INftOptions } from "./nftOptions";

export const getCollectionCardOptions = (
  router: SingletonRouter,
  collectionId: string,
  toast: any,
  collectionDispatch: Dispatch<ICollectionAction>
): { all: Array<INftOptions>; onlyOwner: Array<INftOptions> } => ({
  onlyOwner: [
    {
      label: "Delete Collection",
      onClick: async () => {
        const deleteRes = await deleteCollection(collectionId);
        if (deleteRes.success) {
          collectionDispatch({
            type: "DELETE_COLLECTION",
            payload: collectionId,
          });
          toast({
            title: "Collection Deleted",
            description: "Collection has been deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: deleteRes.error,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    },
  ],
  all: [
    {
      label: "View Collection",
      onClick: () => {},
    },
    {
      label: "Share Collection",
      onClick: async () => {
        await navigator.clipboard.writeText(
          `${process.env.REACT_APP_BASE_URL}/collection/${collectionId}`
        );
        toast({
          title: "Copied",
          description: "NFT link copied to clipboard",
          status: "success",
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
        });
      },
    },
  ],
});

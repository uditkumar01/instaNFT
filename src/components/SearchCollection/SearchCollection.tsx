/* eslint-disable max-len */
import React, { ReactNode, useRef, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { FiPlus } from "react-icons/fi";
import { IoMdRemove } from "react-icons/io";
import { QueryModal } from "..";
import { searchCollection } from "../../utils/Firestore/collections/searchCollection";
import { updateItemOfCollection } from "../../utils/Firestore/collections/updateItemOfCollection";
import { ICollection } from "../../pages/u/reducer/collectionReducer";

const initalState = {
  collections: [],
  loading: false,
  error: "",
};

export function SearchCollection({
  children,
  nftUid,
  nftImage,
  collectionDispatch,
}: {
  children: ReactNode;
  nftUid: string;
  nftImage?: string;
  collectionDispatch?: any;
}): JSX.Element {
  const initialRef = useRef<HTMLInputElement>(null);
  const timeOutRef = useRef(null);
  const toast = useToast();
  const [searchResults, setSearchResults] = useState<{
    collections: ICollection[];
    loading: boolean;
    error: string;
  }>(initalState);

  const handleSubmit = async (query: string): Promise<void> => {
    if (!query?.length || query.length < 1) {
      setSearchResults({
        collections: [],
        loading: false,
        error: "Query must be at least 1 characters long",
      });
      return;
    }

    const searchRes = await searchCollection(query.toLowerCase());

    if (searchRes?.success) {
      setSearchResults((prevState) => {
        return {
          ...prevState,
          collections: searchRes.collections,
          loading: false,
          error: "",
        };
      });
    } else {
      setSearchResults((prevState) => {
        return {
          ...prevState,
          data: [],
          loading: false,
          error: "Invalid query",
        };
      });
    }
  };

  const addNftToCollection = async (collection: ICollection) => {
    // console.log("addNftToCollection", collection.uid, nftUid);
    if (!collection?.uid || !nftUid) return;

    const addNftRes = await updateItemOfCollection(collection.uid, nftUid);
    if (addNftRes?.success) {
      collectionDispatch({
        type: "UPDATE_ITEM_OF_COLLECTION",
        payload: {
          collectionId: collection.uid,
          itemId: nftUid,
          image: nftImage,
        },
      });
      toast({
        title: "Success",
        description: "NFT added to collection",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    } else {
      toast({
        title: "Error",
        description: "NFT could not be added to collection",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
  };

  const handleDebounce = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    if (!searchResults?.loading) {
      setSearchResults((prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      });
    }
    const timeoutId = setTimeout(() => {
      handleSubmit(initialRef?.current?.value || "");
    }, 2000);
    timeOutRef.current = timeoutId as any;
  };

  const addToCollectionBtn = (item: any) => {
    if (item?.items?.includes(nftUid)) {
      return <IoMdRemove color="gray" fontSize="1.3rem" />;
    }
    return <FiPlus color="gray" fontSize="1.3rem" />;
  };

  return (
    <>
      <QueryModal
        key="query-modal-collection-search"
        inputRef={initialRef}
        placeholder="Search collections (min 1 characters)..."
        onChangeCallback={handleDebounce}
        onCloseCallback={() => {
          setSearchResults(initalState);
        }}
        searchResults={searchResults}
        callback={addNftToCollection}
        queryCardIcon={addToCollectionBtn}
      >
        {children}
      </QueryModal>
    </>
  );
}

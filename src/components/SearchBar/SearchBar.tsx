import React, { ReactNode, useRef, useState } from "react";
import router from "next/router";
// eslint-disable-next-line max-len
import { searchUsers } from "../../utils/Firestore/user/search/search";
import { QueryModal } from "..";
import { IUser } from "../../context/Auth/Auth";
import { INFT } from "../../utils/Firestore/nft/addNfts";

const initalState = {
  users: [],
  nfts: [],
  loading: false,
  error: "",
};

export function SearchBar({ children }: { children: ReactNode }): JSX.Element {
  const initialRef = useRef<HTMLInputElement>(null);
  const timeOutRef = useRef(null);
  const [searchResults, setSearchResults] = useState<{
    users: IUser[];
    nfts: INFT[];
    loading: boolean;
    error: string;
  }>(initalState);

  const handleSubmit = async (query: string): Promise<void> => {
    if (!query?.length || query.length < 4) {
      setSearchResults({
        users: [],
        nfts: [],
        loading: false,
        error: "Query must be at least 4 characters long",
      });
      return;
    }

    const searchRes = await searchUsers(query.toLowerCase());

    if (searchRes?.success) {
      setSearchResults((prevState) => {
        return {
          ...prevState,
          users: searchRes.users,
          nfts: searchRes.nfts,
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

  const callback = (item: any) => {
    const url =
      item?.queryType === "user"
        ? `/u/${item?.username}`
        : `/nft/${item?.tokenAddress}/${item?.tokenId}`;

    router.push(url);
  };

  return (
    <>
      <QueryModal
        key="query-modal-search-bar"
        inputRef={initialRef}
        onChangeCallback={handleDebounce}
        onCloseCallback={() => {
          setSearchResults(initalState);
        }}
        searchResults={searchResults}
        callback={callback}
      >
        {children}
      </QueryModal>
    </>
  );
}

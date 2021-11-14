import { useDisclosure } from "@chakra-ui/hooks";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React, { ReactNode, RefObject } from "react";
import { BsSearch } from "react-icons/bs";
import { Spinner } from "@chakra-ui/spinner";
// eslint-disable-next-line max-len
import { QueryResults } from "..";

interface IQueryModal {
  children: ReactNode;
  searchResults: any;
  inputRef: RefObject<HTMLInputElement>;
  onCloseCallback: () => void;
  onChangeCallback: () => void;
  placeholder?: string;
  callback?: any;
  queryCardIcon?: any;
}

export function QueryModal({
  children,
  onChangeCallback,
  onCloseCallback,
  searchResults,
  inputRef,
  callback,
  placeholder,
  queryCardIcon,
}: IQueryModal): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseHandler = (): void => {
    onCloseCallback();
    onClose();
  };

  return (
    <>
      <Flex w="full" onClick={onOpen}>
        {children}
      </Flex>

      <Modal
        initialFocusRef={inputRef}
        isOpen={isOpen}
        onClose={onCloseHandler}
      >
        <ModalOverlay />
        <ModalContent w="full" maxW="800px" p="0.7rem" mx="0.5rem">
          <InputGroup>
            <InputLeftElement>
              <BsSearch fontSize="1.1rem" />
            </InputLeftElement>
            <Input
              variant="flushed"
              ref={inputRef}
              placeholder={
                placeholder || "Type atleast 4 characters to search ..."
              }
              onChange={onChangeCallback}
              fontSize="1.1rem"
              borderColor={
                searchResults?.users?.length < 1 &&
                searchResults?.nfts?.length < 1
                  ? "transparent !important"
                  : "inherit"
              }
              pl="2.8rem"
            />
            <InputRightElement>
              <Spinner
                size="sm"
                color="gray.500"
                opacity={(searchResults?.loading || 0) < 1 ? 0 : 1}
              />
            </InputRightElement>
          </InputGroup>
          {Object.entries(searchResults)?.map(([key, value]) => {
            if (typeof value === typeof []) {
              return (
                <QueryResults
                  key={`search-results-${key}`}
                  title={key}
                  results={value as any[]}
                  onClose={onCloseHandler}
                  callback={callback}
                  queryCardIcon={queryCardIcon}
                />
              );
            }
            return null;
          })}
          {/* <QueryResults
            onClose={onCloseHandler}
            results={searchResults?.users || []}
            title="Users"
          />
          <QueryResults
            onClose={onCloseHandler}
            results={searchResults?.nfts || []}
            title="Nfts"
          /> */}
        </ModalContent>
      </Modal>
    </>
  );
}

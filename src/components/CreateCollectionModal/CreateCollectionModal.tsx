import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AutoCompleteField } from "..";
import useAuth, { IUser } from "../../context/Auth/Auth";
import useColorProvider from "../../context/ColorsProvider";
// eslint-disable-next-line max-len

interface ICreatCollectionModal {
  children: ReactNode;
  prevTags?: string[];
  collectionName?: string;
  collectionId?: string;
  btnText?: string;
  collectionNameDisabled?: boolean;
  onSuccessCallback?: any;
  collectionDispatch?: any;
  callback: (
    toast: any,
    collectionDispatch: any,
    user: IUser | null,
    tags: string[],
    inputValue?: string,
    collectionId?: string,
    onSuccessCallback?: any
  ) => Promise<void>;
}

export function CreateCollectionModal({
  children,
  prevTags,
  collectionName,
  collectionId,
  collectionNameDisabled,
  onSuccessCallback,
  btnText,
  collectionDispatch,
  callback,
}: ICreatCollectionModal): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState<string[]>([]);
  const initialRef = useRef<HTMLInputElement>(null);
  const { color } = useColorProvider();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const toast = useToast();
  const { user } = useAuth();
  let inputProps: any = {};
  if (collectionNameDisabled) {
    inputProps = {
      value: collectionName,
    };
  }

  useEffect(() => {
    if (prevTags) {
      setTags(prevTags);
    }
  }, [prevTags]);

  return (
    <>
      <Flex onClick={onOpen}>{children}</Flex>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{btnText || "Create Collection"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Collection name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Collection name"
                {...inputProps}
                isDisabled={collectionNameDisabled}
              />
              <AutoCompleteField
                label="Add Tags"
                selectedOptions={tags}
                setSelectedOptions={setTags}
                key={`auto-complete-field-${color}`}
              />
            </FormControl>

            <Flex flexWrap="wrap" isInline mt="1rem">
              {tags.map((tag) => (
                <Tag
                  size="md"
                  key={`create-collection-tag-${tag}`}
                  borderRadius="full"
                  variant="subtle"
                  colorScheme={color}
                  // textTransform="uppercase"
                  h="fit-content"
                  m={2}
                  ml={0}
                  mb={1}
                  fontSize="0.8rem"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter d="flex" w="full">
            <Button
              flex="1"
              colorScheme={color}
              onClick={async () => {
                setIsCreating(true);
                await callback(
                  toast,
                  collectionDispatch,
                  user,
                  tags,
                  initialRef?.current?.value,
                  collectionId,
                  onSuccessCallback
                );
                onClose();
                setIsCreating(false);
              }}
              aria-label="Create Collection"
              isLoading={isCreating}
            >
              {btnText || "Create Collection"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

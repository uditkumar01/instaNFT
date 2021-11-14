import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { HiCloudUpload } from "react-icons/hi";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Avatar } from "@chakra-ui/avatar";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BiChevronDown } from "react-icons/bi";
import { DropZone, InfoZone } from "../../components/Dropzone/Dropzone";
import { WithAuth } from "../../HOC/WithAuth";
import useAuth from "../../context/Auth/Auth";
import { FieldError } from "../../components/FieldError/FieldError";
// eslint-disable-next-line max-len
import { updateProfileData } from "../../utils/Firestore/user/updateProfileData";
import { FieldGroup, Layout, Sidebar, TagWithLabel } from "../../components";
import { uploadImage } from "../../utils/Storage/uploadImage";
import { ipfsUpload } from "../../lib/morails/ipfsUpload";
import { mintNFT } from "../../lib/nftp/mintNFT";

interface IErrorAction {
  type: string;
  payload: {
    name: string;
    value: string;
  };
}

function errorReducer(state: IErrorState, action: IErrorAction) {
  switch (action.type) {
    case "clear":
      return { ...state, [action.payload.name]: action.payload.value };
    case "set":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}

const initialState = {
  name: "",
  collectionName: "",
  desc: "",
  website: "",
};

const options = [
  {
    label: "Polygon",
  },
  {
    label: "Rinkeby",
  },
  {
    label: "Ethereum",
    isDisabled: true,
  },
  {
    label: "Tezos",
    isDisabled: true,
  },
];

type IErrorState = typeof initialState;

const websiteRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+(\/)?$/;

function Mint() {
  const { user, authDispatch } = useAuth();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const collectionNameInputRef = useRef<HTMLInputElement | null>(null);
  const descInputRef = useRef<HTMLTextAreaElement | null>(null);
  const websiteInputRef = useRef<HTMLInputElement | null>(null);
  const [selectChain, setSelectChain] = useState(options[0].label);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, errorsDispatch] = useReducer(errorReducer, initialState);
  const color = "twitter";
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [metaData, setMetaData] = useState<any>({});
  const propertyKeyRef = useRef<HTMLInputElement | null>(null);
  const propertyValueRef = useRef<HTMLInputElement | null>(null);
  const walletAddressRef = useRef<HTMLInputElement | null>(null);

  const regexCheck = (
    value: string,
    key: string,
    regex: RegExp,
    error: string
  ) => {
    const isAlnum = regex.test(value);
    // use regex.match to get the first match

    if (!isAlnum && errors?.[key as keyof IErrorState]?.length < 1) {
      errorsDispatch({
        type: "set",
        payload: {
          name: key,
          value: error,
        },
      });
    } else if (isAlnum && errors?.[key as keyof IErrorState]?.length > 0) {
      errorsDispatch({
        type: "clear",
        payload: {
          name: key,
          value: "",
        },
      });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (
      !nameInputRef.current ||
      !collectionNameInputRef.current ||
      !descInputRef.current ||
      !user
    ) {
      return;
    }

    const name = nameInputRef.current?.value || "";
    const collectionName = collectionNameInputRef?.current.value || "";
    const description = descInputRef.current?.value || "";
    const website = websiteInputRef?.current?.value || "";

    if (
      errors?.name?.length > 0 ||
      errors?.collectionName?.length > 0 ||
      errors?.desc?.length > 0 ||
      errors?.website?.length > 0
    ) {
      toast({
        title: "Error",
        description: "Please fix the errors before submitting",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
      return;
    }

    setIsUploading(true);

    const payload: any = {};
    if (name?.length > 0) {
      payload.name = name;
    } else {
      toast({
        title: "Error",
        description: "NFT name is required",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
      setIsUploading(false);
      return;
    }
    if (collectionName?.length > 0) {
      payload.collection = collectionName;
    }
    if (description?.length > 0) {
      payload.description = description;
    }

    if (website?.length > 0) {
      payload.external_link = website.startsWith("https://")
        ? website
        : `https://${website}`;
    }

    if (!coverImage) {
      toast({
        title: "Error",
        description: "Please upload a nft asset",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
      setIsUploading(false);
      return;
    }

    const fileExtensionCover = coverImage?.name?.split(".")?.pop();

    const coverImageUrl = await uploadImage(
      coverImage,
      `${user?.uid}.${fileExtensionCover}`,
      "cover",
      user?.coverImageURL,
      user?.uid
    );
    let imageUrl = "";
    if (coverImageUrl?.success) {
      imageUrl = coverImageUrl.url;
    } else {
      toast({
        title: "Error",
        description: "Can't upload asset",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
      setIsUploading(false);
      return;
    }

    payload.chain = selectChain?.toLowerCase();
    payload.mint_to_address = walletAddressRef?.current?.value || "";

    const ipfsRes = await ipfsUpload({
      ...metaData,
      image: imageUrl,
    });

    if (ipfsRes?.success) {
      payload.file_url = ipfsRes.path;
    }

    const mintRes = await mintNFT(payload);

    if (mintRes?.success) {
      toast({
        title: "Success",
        description: "NFT minted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    } else {
      toast({
        title: "Can't mint NFT",
        description: mintRes?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
    setIsUploading(false);
  };

  const coverImageUrl = coverImage && URL.createObjectURL(coverImage);

  return (
    <Layout title="Account" expandedNav>
      <Flex w="full" h="full" justify="center" align="center">
        <Flex w="full" h="full" maxW="1400px">
          <Sidebar />
          <Box px={{ base: "4", md: "10" }} py="12" w="full">
            <chakra.form
              id="settings-form"
              onSubmit={(e) => {
                e.preventDefault();
                // form submit logic
              }}
            >
              <Stack spacing="4" divider={<StackDivider />}>
                <Heading size="lg" as="h1" paddingBottom="4">
                  Mint NFT
                </Heading>
                <FieldGroup title="NFT Asset">
                  <DropZone key="cover-photo-dropzone" setFile={setCoverImage}>
                    <InfoZone
                      key="cover-photo-infozone"
                      coverImageURL={coverImageUrl}
                    />
                  </DropZone>
                </FieldGroup>
                <FieldGroup title="NFT Info">
                  <VStack width="full" spacing="6">
                    <FormControl id="name">
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        ref={nameInputRef}
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.displayName;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                        }}
                        isInvalid={errors.name?.length > 0}
                      />
                      <FieldError error={errors.name} />
                    </FormControl>

                    <FormControl id="username">
                      <FormLabel>Collection</FormLabel>
                      <Input
                        ref={collectionNameInputRef}
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.username;

                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                        }}
                        type="text"
                        isInvalid={errors.collectionName?.length > 0}
                      />
                      <FieldError error={errors.collectionName} />
                    </FormControl>

                    <FormControl id="bio">
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        ref={descInputRef}
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.bio;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          // less than 180 characters
                        }}
                        rows={5}
                        isInvalid={errors.desc?.length > 0}
                      />
                      <FormHelperText>
                        Brief description of your NFT in less than 180
                        characters.
                      </FormHelperText>
                      <FieldError error={errors.desc} />
                    </FormControl>

                    <FormControl id="opensea-field">
                      <FormLabel>External Link</FormLabel>
                      <Input
                        ref={websiteInputRef}
                        type="text"
                        placeholder="https://website.com"
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.websiteLink;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          regexCheck(
                            e.target.value,
                            "website",
                            websiteRegex,
                            "Invalid link"
                          );
                        }}
                        isInvalid={errors?.website.length > 0}
                      />
                      <FieldError error={errors.website} />
                    </FormControl>

                    <FormControl id="opensea-field">
                      <FormLabel>Wallet Address</FormLabel>
                      <Input
                        ref={websiteInputRef}
                        type="text"
                        placeholder="wallet address"
                      />
                    </FormControl>
                    <Menu>
                      <MenuButton
                        variant="ghost"
                        rounded="full"
                        cursor="pointer"
                        minW={0}
                        w="full"
                      >
                        <Button justifyContent="space-between" w="full">
                          {selectChain}
                          <BiChevronDown fontSize="1.3rem" />
                        </Button>
                      </MenuButton>
                      <MenuList>
                        {options.map((optionItem) => {
                          const { label, isDisabled } = optionItem;
                          return (
                            <MenuItem
                              p="0"
                              d="flex"
                              alignItems="center"
                              key={`menu-option-${label}-mint-chain`}
                            >
                              <Button
                                textDecoration="none !important"
                                textAlign="left"
                                justifyContent="flex-start"
                                fontWeight="normal"
                                bg="transparent"
                                w="full"
                                rounded="none"
                                onClick={() => {
                                  setSelectChain(label);
                                }}
                                aria-label={label}
                                isDisabled={isDisabled}
                              >
                                {label}
                              </Button>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                    <FormControl id="opensea-field" pt={4}>
                      <FormLabel>Properties</FormLabel>
                      <Stack
                        direction={{
                          base: "column",
                          md: "row",
                        }}
                      >
                        <Input
                          ref={propertyKeyRef}
                          type="text"
                          placeholder="Property name"
                        />
                        <Input
                          ref={propertyValueRef}
                          type="text"
                          placeholder="Property value"
                        />
                      </Stack>
                      <Button
                        mt={4}
                        w="full"
                        colorScheme="twitter"
                        onClick={() => {
                          if (
                            propertyKeyRef?.current?.value &&
                            propertyValueRef?.current?.value
                          ) {
                            setMetaData((prev: any) => {
                              if (
                                propertyKeyRef?.current?.value &&
                                propertyValueRef?.current?.value
                              ) {
                                return {
                                  ...prev,
                                  [propertyKeyRef?.current.value || ""]:
                                    propertyValueRef?.current?.value,
                                };
                              }
                              return prev;
                            });
                            propertyKeyRef.current.value = "";
                            propertyValueRef.current.value = "";
                          }
                        }}
                      >
                        + Add New Property
                      </Button>
                    </FormControl>
                    <Flex w="full" flexWrap="wrap">
                      {Object.entries(metaData || {}).map((tag: any) => (
                        <TagWithLabel
                          key={`property-tag-${tag[0]}`}
                          tag={tag}
                        />
                      ))}
                    </Flex>
                  </VStack>
                </FieldGroup>
              </Stack>
              <FieldGroup mt="8">
                <Stack
                  width="full"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                  justify="flex-start"
                >
                  <Button
                    type="submit"
                    isDisabled={!hasChanges}
                    colorScheme={color}
                    onClick={handleSubmit}
                    isLoading={isUploading}
                    aria-label="Save Profile"
                  >
                    Mint NFT
                  </Button>
                </Stack>
              </FieldGroup>
            </chakra.form>
            <br />
            <br />
            <br />
            <br />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default WithAuth(Mint);

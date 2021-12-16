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
import { DropZone, InfoZone } from "../../components/Dropzone/Dropzone";
import { WithAuth } from "../../HOC/WithAuth";
import useAuth from "../../context/Auth/Auth";
import { FieldError } from "../../components/FieldError/FieldError";
// eslint-disable-next-line max-len
import { updateProfileData } from "../../utils/Firestore/user/updateProfileData";
import { FieldGroup, Layout, Sidebar } from "../../components";
import { uploadImage } from "../../utils/Storage/uploadImage";
import useColorProvider from "../../context/ColorsProvider";

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
  username: "",
  bio: "",
  linktree: "",
  twitter: "",
  website: "",
};

type IErrorState = typeof initialState;

const twitterRegex =
  /^(https?:\/\/)?(www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+(\/)?$/;
const linktreeRegex = /^(https?:\/\/)?(www\.)?linktr\.ee\/[a-zA-Z0-9_]+(\/)?$/;
const websiteRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+(\/)?$/;

function Account() {
  const { user, authDispatch } = useAuth();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const bioInputRef = useRef<HTMLTextAreaElement | null>(null);
  const twitterInputRef = useRef<HTMLInputElement | null>(null);
  const linktreeInputRef = useRef<HTMLInputElement | null>(null);
  const websiteInputRef = useRef<HTMLInputElement | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, errorsDispatch] = useReducer(errorReducer, initialState);
  const { color } = useColorProvider();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profileImage || coverImage) {
      setHasChanges(true);
    }
  }, [profileImage, coverImage]);

  // populate the form with the user's data
  useEffect(() => {
    if (
      user &&
      nameInputRef.current &&
      usernameInputRef.current &&
      bioInputRef.current &&
      twitterInputRef.current &&
      linktreeInputRef.current &&
      websiteInputRef.current
    ) {
      nameInputRef.current.value = user?.displayName || "";
      usernameInputRef.current.value = user.username || "";
      bioInputRef.current.value = user.bio || "";
      twitterInputRef.current.value = user.twitterLink || "";
      linktreeInputRef.current.value = user.linktreeLink || "";
      websiteInputRef.current.value = user.websiteLink || "";
    }
  }, [user]);

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
      !usernameInputRef.current ||
      !bioInputRef.current
    ) {
      return;
    }

    const name = nameInputRef.current?.value || "";
    const username = usernameInputRef?.current.value || "";
    const bio = bioInputRef.current?.value || "";
    const twitter = twitterInputRef?.current?.value || "";
    const linktree = linktreeInputRef?.current?.value || "";
    const website = websiteInputRef?.current?.value || "";

    if (
      errors?.name?.length > 0 ||
      errors?.username?.length > 0 ||
      errors?.bio?.length > 0 ||
      errors?.twitter?.length > 0 ||
      errors?.linktree?.length > 0 ||
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
      payload.displayName = name;
    }
    if (username?.length > 3) {
      if (username?.trim() !== user?.username) payload.username = username;
    } else {
      toast({
        title: "Error",
        description: "Username must be at least 4 characters",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
    if (bio?.length > 0) {
      payload.bio = bio;
    }
    if (twitter?.length > 0) {
      payload.twitterLink = twitter.startsWith("https://")
        ? twitter
        : `https://${twitter}`;
    }
    if (linktree?.length > 0) {
      payload.linktreeLink = linktree.startsWith("https://")
        ? linktree
        : `https://${linktree}`;
    }
    if (website?.length > 0) {
      payload.websiteLink = website.startsWith("https://")
        ? website
        : `https://${website}`;
    }
    const fileExtension = profileImage?.name?.split(".").pop();
    const profileImageUrl = await uploadImage(
      profileImage,
      `${user?.uid}.${fileExtension}`,
      "profile",
      user?.photoURL,
      user?.uid
    );

    if (profileImageUrl?.success) {
      payload.photoURL = profileImageUrl.url;
    }

    const fileExtensionCover = coverImage?.name?.split(".").pop();
    const coverImageUrl = await uploadImage(
      coverImage,
      `${user?.uid}.${fileExtensionCover}`,
      "cover",
      user?.coverImageURL,
      user?.uid
    );

    if (coverImageUrl?.success) {
      payload.coverImageURL = coverImageUrl.url;
    }

    const updatedUser = await updateProfileData(user?.uid, payload);

    if (updatedUser?.success) {
      authDispatch({
        type: "SET_USER",
        payload: {
          ...user,
          ...payload,
        },
      });
      setHasChanges(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    } else {
      toast({
        title: "Error",
        description: updatedUser?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    }
    setIsUploading(false);
  };

  const resetForm = () => {
    if (nameInputRef.current) {
      nameInputRef.current.value = user?.displayName?.toLowerCase() || "";
    }
    if (usernameInputRef.current) {
      usernameInputRef.current.value = user?.username?.toLowerCase() || "";
    }
    if (bioInputRef.current) {
      bioInputRef.current.value = user?.bio || "";
    }
    if (twitterInputRef.current) {
      twitterInputRef.current.value = user?.twitterLink || "";
    }
    if (linktreeInputRef.current) {
      linktreeInputRef.current.value = user?.linktreeLink || "";
    }
    if (websiteInputRef.current) {
      websiteInputRef.current.value = user?.websiteLink || "";
    }
    setCoverImage(null);
    setProfileImage(null);
    setHasChanges(false);
  };

  const profileImageUrl = profileImage && URL.createObjectURL(profileImage);
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
                  Account Settings
                </Heading>
                <FieldGroup title="Personal Info">
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
                          regexCheck(
                            e.target.value,
                            "name",
                            /^[a-zA-Z ]+$/,
                            "Name must be alphabetic"
                          );
                        }}
                        isInvalid={errors.name?.length > 0}
                      />
                      <FieldError error={errors.name} />
                    </FormControl>

                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        isReadOnly
                        value={user?.email || ""}
                      />
                    </FormControl>

                    <FormControl id="username">
                      <FormLabel>Username</FormLabel>
                      <Input
                        ref={usernameInputRef}
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.username;

                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          regexCheck(
                            e.target.value,
                            "username",
                            /^[a-zA-Z0-9]+$/,
                            "Username must be alphanumeric"
                          );
                        }}
                        type="text"
                        isInvalid={errors.username?.length > 0}
                      />
                      <FieldError error={errors.username} />
                    </FormControl>

                    <FormControl id="bio">
                      <FormLabel>Bio</FormLabel>
                      <Textarea
                        ref={bioInputRef}
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.bio;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          // less than 180 characters
                          regexCheck(
                            e.target.value,
                            "bio",
                            /^.{0,180}$/,
                            "Should be less than 180 characters"
                          );
                        }}
                        rows={5}
                        isInvalid={errors.bio?.length > 0}
                      />
                      <FormHelperText>
                        Brief description for your profile in less than 180
                        characters. URLs are hyperlinked.
                      </FormHelperText>
                      <FieldError error={errors.bio} />
                    </FormControl>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Social Info">
                  <VStack width="full" spacing="6">
                    <FormControl id="twitter-field">
                      <FormLabel>Twitter</FormLabel>
                      <Input
                        ref={twitterInputRef}
                        type="text"
                        placeholder="https://twitter.com/username"
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.twitterLink;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          regexCheck(
                            e.target.value,
                            "twitter",
                            twitterRegex,
                            "Invalid twitter link"
                          );
                        }}
                        isInvalid={errors?.twitter.length > 0}
                      />
                      <FieldError error={errors.twitter} />
                    </FormControl>
                    <FormControl id="slack-field">
                      <FormLabel>Linktree</FormLabel>
                      <Input
                        ref={linktreeInputRef}
                        type="text"
                        placeholder="https://linktree.com/username"
                        onChange={(e) => {
                          const isSame = e.target.value !== user?.linktreeLink;
                          if (isSame !== hasChanges) {
                            setHasChanges(isSame);
                          }
                          regexCheck(
                            e.target.value,
                            "linktree",
                            linktreeRegex,
                            "Invalid linktree link"
                          );
                        }}
                        isInvalid={errors?.linktree.length > 0}
                      />
                      <FieldError error={errors.linktree} />
                    </FormControl>
                    <FormControl id="opensea-field">
                      <FormLabel>Website</FormLabel>
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
                            "Invalid website link"
                          );
                        }}
                        isInvalid={errors?.website.length > 0}
                      />
                      <FieldError error={errors.website} />
                    </FormControl>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Profile Photo">
                  <Stack
                    direction="row"
                    spacing="6"
                    align="center"
                    width="full"
                  >
                    <Avatar
                      size="xl"
                      name={user?.username || user?.uid}
                      src={profileImageUrl || user?.photoURL || ""}
                    />
                    <Box>
                      <HStack spacing="5">
                        <DropZone
                          key="profile-image-dropzone"
                          setFile={setProfileImage}
                          maxSize={1024 * 1024}
                        >
                          <Button
                            leftIcon={<HiCloudUpload />}
                            aria-label="Upload Profile Image"
                          >
                            Change photo
                          </Button>
                        </DropZone>
                      </HStack>
                      <Text
                        fontSize="sm"
                        mt="3"
                        color={useColorModeValue("gray.500", "whiteAlpha.600")}
                      >
                        .jpg, .gif, or .png. Max file size 700K.
                      </Text>
                    </Box>
                  </Stack>
                </FieldGroup>
                <FieldGroup title="Cover Photo">
                  <DropZone key="cover-photo-dropzone" setFile={setCoverImage}>
                    <InfoZone
                      key="cover-photo-infozone"
                      coverImageURL={coverImageUrl}
                    />
                  </DropZone>
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
                    Save Changes
                  </Button>
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    onClick={resetForm}
                    aria-label="Reset Recent Changes"
                  >
                    Reset Changes
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

export default WithAuth(Account);

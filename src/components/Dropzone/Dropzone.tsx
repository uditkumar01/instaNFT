import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React, { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import Dropzone from "react-dropzone";
import useAuth from "../../context/Auth/Auth";

export function InfoZone({
  coverImageURL,
}: {
  coverImageURL: string | null;
}): JSX.Element {
  const { user } = useAuth();
  return (
    <Flex
      mt={1}
      justify="center"
      px={6}
      pt={5}
      pb={6}
      borderWidth={2}
      borderColor={useColorModeValue("gray.300", "gray.500")}
      borderStyle="dashed"
      rounded="md"
      pos="relative"
      className="dropzone-area"
    >
      <Box
        pos="absolute"
        w="100%"
        h="100%"
        top="0"
        left="0"
        rounded="md"
        bg={useColorModeValue("gray.100", "gray.900")}
        bgImage={`url(${coverImageURL})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        opacity={0.5}
        zIndex={-1}
      />
      <Stack
        gap={1}
        textAlign="center"
        pos="relative"
        zIndex={1}
        p="1rem"
        rounded="md"
        bg={useColorModeValue("gray.100", "gray.800")}
      >
        <Icon
          mx="auto"
          boxSize={12}
          color={useColorModeValue("gray.400", "gray.500")}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            // eslint-disable-next-line max-len
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
        <Flex
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
          alignItems="baseline"
        >
          <chakra.label
            htmlFor="file-upload"
            cursor="pointer"
            rounded="md"
            fontSize="md"
            color={useColorModeValue("brand.600", "brand.200")}
            pos="relative"
            _hover={{
              color: useColorModeValue("brand.400", "brand.300"),
            }}
          >
            <span>Upload a file</span>
          </chakra.label>
          <Text pl={1}>or drag and drop</Text>
        </Flex>
        <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.50")}>
          PNG, JPG, GIF up to 4MB
        </Text>
      </Stack>
    </Flex>
  );
}

export function DropZone({
  children,
  setFile,
  maxSize,
}: {
  children: ReactNode;
  setFile: Dispatch<SetStateAction<File | null>>;
  maxSize?: number;
}): JSX.Element {
  const handleDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles?.[0];
      if (!file) return;
      setFile(file);
    },
    [setFile]
  );

  return (
    <Dropzone
      onDrop={handleDrop}
      accept="image/*"
      minSize={1024}
      maxSize={maxSize || 4 * 1024 * 1024}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      }) => {
        const additionalClass =
          (isDragAccept && "accept") ||
          (isDragReject && "reject") ||
          (isDragActive && "active") ||
          "";

        return (
          <>
            <FormControl
              {...getRootProps()}
              cursor="pointer"
              className={`dropzone ${additionalClass}`}
            >
              {children}
              <VisuallyHidden>
                <input {...getInputProps()} />
              </VisuallyHidden>
            </FormControl>
          </>
        );
      }}
    </Dropzone>
  );
}

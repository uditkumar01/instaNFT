import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export function ImageViewer({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = "twitter";
  return (
    <>
      <Box cursor="zoom-in" onClick={onOpen}>
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          w="100%"
          h="100%"
          maxW="100vw"
          maxH="100vh"
          p={0}
          m={0}
        >
          <IconButton
            border="3px solid"
            borderColor={useColorModeValue(
              "rgba(0, 0, 0, 0.5)",
              "rgba(255, 255, 255, 0.5)"
            )}
            colorScheme={color}
            pos="absolute"
            bottom="30px"
            left="50%"
            transform="translateX(-50%)"
            h={{ base: "50px", md: "50px" }}
            w={{ base: "50px", md: "50px" }}
            rounded="full"
            onClick={onClose}
            zIndex={10}
            icon={
              <Icon
                as={FaTimes}
                onClick={onClose}
                fontSize={{ base: "1.2rem", md: "1.4rem" }}
              />
            }
            aria-label="Close Modal"
          />
          {/* <ModalBody> */}
          <TransformWrapper>
            <TransformComponent>
              <Image
                src={src}
                alt="test"
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "contain",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
}

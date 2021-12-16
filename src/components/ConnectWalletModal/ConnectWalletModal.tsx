import React, { useRef } from "react";
import { FaLock, FaPlus } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import { Badge, Flex, Stack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import useWeb3 from "../../context/Web3/Web3";
import useColorProvider from "../../context/ColorsProvider";

function WalletConnectorButton({
  imagePath,
  label,
  onClick,
  isDisabled,
  tooltip,
  imgWidth,
}: {
  imagePath: string;
  label: string;
  onClick: () => void | Promise<void>;
  isDisabled?: boolean;
  tooltip?: string;
  imgWidth?: string | number;
}): JSX.Element {
  return (
    <Tooltip
      label={tooltip}
      hasArrow
      arrowSize={8}
      isDisabled={!tooltip}
      placement="top"
    >
      <Button
        transition="all 0.2s"
        onClick={() => {
          if (!isDisabled) onClick();
        }}
        w="80%"
        rounded="full"
        pos="relative"
        aria-label={label}
      >
        <Flex
          h="20px"
          w="20px"
          bg="whiteAlpha.900"
          rounded="full"
          justify="center"
          align="center"
        >
          <Image
            src={imagePath || "/images/eth.svg"}
            w={imgWidth || 13}
            alt="eth-icon"
          />
        </Flex>
        &nbsp; {label} &nbsp;
        {isDisabled && (
          <Badge colorScheme="cyan" p="4px" rounded="lg">
            <FaLock />
          </Badge>
        )}
      </Button>
    </Tooltip>
  );
}

export function ConnectWalletModal(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { color } = useColorProvider();
  const { loadWeb3Modal, loadTezos } = useWeb3();

  return (
    <>
      <Button
        mt={8}
        colorScheme={color}
        onClick={onOpen}
        aria-label="Connect Wallet"
      >
        <Icon as={FaPlus} mr="0.5rem" fontSize="sm" />
        <Text fontSize="md">Connect Wallet</Text>
      </Button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="1rem 0">
            <Stack spacing={4} align="center" p="1rem">
              <WalletConnectorButton
                imagePath="/images/ethereum.png"
                label="Ethereum"
                imgWidth={20}
                onClick={async () => {
                  onClose();
                  await loadWeb3Modal("ethAddresses");
                }}
              />
              <WalletConnectorButton
                imagePath="/images/polygon.webp"
                label="Polygon"
                imgWidth={13}
                onClick={async () => {
                  onClose();
                  await loadWeb3Modal("polygonAddresses");
                }}
              />
              <WalletConnectorButton
                imagePath="/images/tezos.png"
                label="Tezos"
                imgWidth="10px"
                onClick={async () => {
                  onClose();
                  await loadTezos();
                }}
              />

              <WalletConnectorButton
                imagePath="/images/solana.png"
                label="Solana"
                onClick={() => {}}
                tooltip="Coming Soon"
                isDisabled
              />

              <WalletConnectorButton
                imagePath="/images/avalanche.png"
                label="Avalanche"
                onClick={() => {}}
                tooltip="Coming Soon"
                isDisabled
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

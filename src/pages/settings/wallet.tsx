import { Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React, { ChangeEvent, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { GiWallet } from "react-icons/gi";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import {
  Layout,
  Sidebar,
  WalletAddressBar,
  WalletCard,
} from "../../components";
import { WithAuth } from "../../HOC/WithAuth";
import useWeb3 from "../../context/Web3/Web3";
import useAuth from "../../context/Auth/Auth";
import { getImagePathFromKey } from "../../utils/getImagePathFromKey";

function ConnectWallet(): JSX.Element {
  const { loadTezos, loadWeb3Modal } = useWeb3();
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const { user } = useAuth();
  const wallets = [
    {
      name: "Ethereum",
      imagePath: "/images/ethereum.png",
      callback: () => loadWeb3Modal("ethAddresses"),
      p: "0.4rem",
    },
    {
      name: "Polygon",
      imagePath: "/images/polygon.webp",
      callback: () => loadWeb3Modal("polygonAddresses"),
    },
    {
      name: "Tezos",
      imagePath: "/images/tezos.png",
      callback: () => loadTezos(),
    },
    {
      name: "Solana",
      imagePath: "/images/solana.png",
      callback: () => {},
      p: "0.8rem",
      isLocked: true,
    },
    {
      name: "Avalanche",
      imagePath: "/images/avalanche.png",
      callback: () => {},
      isLocked: true,
    },
  ];

  const searchDebounce = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0) {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        // search here
      }, 1000);
      setSearchTimeoutId(timeoutId);
    }
  };

  return (
    <Layout
      title="instaNFT | Connect Wallet"
      key="connect-wallet-page"
      keywords="instanft, connect, wallet"
      description="Connect your wallet to start using instaNFT"
      expandedNav
    >
      <Flex w="full" h="full" justify="center" align="center">
        <Flex w="full" h="full" maxW="1400px">
          <Sidebar />
          <Stack
            w="full"
            h="full"
            maxW="1400px"
            spacing={9}
            mt="3rem"
            mx={{
              base: 4,
              md: 10,
              lg: 16,
            }}
          >
            <Flex w="full" flexDir="column" mb="1rem">
              <Heading
                fontSize="1.8rem"
                fontWeight="bold"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Add New Wallet
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Connect your wallet to start using instaNFT
              </Text>
              <Flex w="full" flexDir="column" maxW="930px">
                {/* <ConnectWalletModal /> */}
                <Flex mt="1.5rem" flexWrap="wrap">
                  {wallets.map((walletItem) => {
                    return (
                      <WalletCard
                        key={`wallet-${walletItem.name}`}
                        {...walletItem}
                      />
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>

            <Flex w="full" flexDir="column" mb="1rem">
              <Heading
                fontSize="1.8rem"
                fontWeight="bold"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Manage Your Wallets
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Remove or search for your wallets that you have connected
                previously
              </Text>
              <Flex mt="2rem" w="full" flexDir="column" maxW="930px">
                <InputGroup boxShadow="sm">
                  <InputLeftElement color="gray.500">
                    <GiWallet size="1.2rem" />
                  </InputLeftElement>
                  <Input
                    onChange={searchDebounce}
                    placeholder="Search for your wallet"
                  />
                  {searchTimeoutId && (
                    <InputRightElement>
                      <Spinner size="sm" />
                    </InputRightElement>
                  )}
                </InputGroup>
                <Divider mt="1rem" />
                <Flex flexWrap="wrap">
                  {user?.ethAddresses?.length ? (
                    user?.ethAddresses?.map((addressItem) => {
                      return (
                        <WalletAddressBar
                          key={`address-bar-${addressItem}`}
                          address={addressItem}
                          imagePath={getImagePathFromKey("ethAddresses")}
                        />
                      );
                    })
                  ) : (
                    <Text
                      w="full"
                      textAlign="center"
                      color="gray.500"
                      mt="0.4rem"
                      fontSize="lg"
                      fontWeight="semibold"
                      p="2rem 0"
                    >
                      You have not added any wallets yet
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <br />
            <br />
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default WithAuth(ConnectWallet);

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Fortmatic from "fortmatic";
import Authereum from "authereum";
import { Bitski } from "bitski";
import Web3 from "web3";
import { DAppClient } from "@airgap/beacon-sdk";
import { useToast } from "@chakra-ui/toast";
import { getNfts } from "../../lib/nftp/getNfts";
// eslint-disable-next-line max-len
import { updateWalletAddresses } from "../../utils/Firestore/user/updateWalletAddresses";
import { addNfts } from "../../utils/Firestore/nft/addNfts";
import { getNFTs } from "../../lib/morails/getNfts";
import { NftLoader } from "../../components";
import useAuth from "../Auth/Auth";

export type IAccountAddresses =
  | "ethAddresses"
  | "polygonAddresses"
  | "tezosAddresses"
  | "solanaAddresses"
  | "avalancheAddresses";

export interface Web3ContextValue {
  loadWeb3Modal: (chain: IAccountAddresses) => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
  loadTezos: () => Promise<void>;
}

interface Web3ContextProviderProps {
  children: ReactNode;
}

const Web3Context = createContext({} as Web3ContextValue);
const INFURA_ID = process.env.REACT_APP_INFURA_ID;

// const testAddress = "0xc352b534e8b987e036a93539fd6897f53488e56a";
const testAddress = "0x16a9f795fa63b38f09a2373793199c16ef019c38";

const initWeb3 = (provider: any) => {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber as any,
      },
    ],
  });

  return web3;
};

export function Web3UtilityProvider({
  children,
}: Web3ContextProviderProps): JSX.Element {
  const [walletAddress, setWalletAddress] = useState<{
    type: IAccountAddresses;
    address: string;
  } | null>(null);
  const { user, isAuthenticated, authDispatch } = useAuth();
  const toast = useToast();
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [dAppClient, setDAppClient] = useState<DAppClient | null>(null);
  const logoutOfWeb3Modal = useCallback(async () => {
    if (web3Modal) web3Modal.clearCachedProvider();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1);
  }, [web3Modal]);

  useEffect(() => {
    const dAppClientInstance = new DAppClient({ name: "Beacon Docs" });
    setDAppClient(dAppClientInstance);
  }, []);

  useEffect(() => {
    const web3ModalInstance = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      theme: {
        background: "#2d3748",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(156, 156, 156)",
        border: "#242c3b",
        hover: "#1c2330",
      },
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: INFURA_ID,
          },
        },
        torus: {
          // eslint-disable-next-line global-require
          package: require("@toruslabs/torus-embed"), // required
        },
        fortmatic: {
          package: Fortmatic,
          options: {
            key: process.env.REACT_APP_FORTMATIC_KEY,
          },
        },
        authereum: {
          package: Authereum,
        },
        bitski: {
          package: Bitski,
          options: {
            clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
            callbackUrl: `${window.location.href}bitski-callback.html`,
          },
        },
      },
    });
    setWeb3Modal(web3ModalInstance);
  }, []);

  const loadWeb3Modal = useCallback(
    async (chain: IAccountAddresses) => {
      if (!web3Modal) return;
      web3Modal.clearCachedProvider();

      const provider = await web3Modal.connect();

      if (!provider?.on) {
        return;
      }

      const web3 = initWeb3(provider);

      const accounts = await web3.eth.getAccounts();

      setWalletAddress({
        type: chain,
        address: accounts[0],
      });
      // setWalletAddress({
      //   type: chain,
      //   address: testAddress,
      // });
    },
    [web3Modal]
  );

  const loadTezos = useCallback(async () => {
    if (!dAppClient) return;

    const activeAccount = await dAppClient.getActiveAccount();
    let myAddress;
    if (!activeAccount) {
      const permissions = await dAppClient.requestPermissions();
      // console.log("New connection:", permissions?.address);
      myAddress = permissions?.address;
    } else {
      myAddress = activeAccount?.address;
    }
    setWalletAddress({
      type: "tezosAddresses",
      address: myAddress,
    });
  }, [dAppClient]);

  // useEffect(() => {

  // }, [walletAddress, authDispatch]);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !user) return;
      if (walletAddress?.type && isAuthenticated) {
        setIsNFTLoading(true);
        const res = await updateWalletAddresses(
          walletAddress.type,
          user.uid,
          walletAddress.address
        );

        if (res?.success) {
          switch (res?.key) {
            case "ethAddresses":
              authDispatch({
                type: "SET_ETH_ADDRESSES",
                payload: res.addresses,
              });

              if (!res.alreadyExists) {
                const newNfts = await getNFTs(res.newAddress, "eth", user.uid);
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }
              if (!res.alreadyExists) {
                const newNfts = await getNFTs(
                  res.newAddress,
                  "polygon",
                  user.uid
                );
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }

              break;
            case "polygonAddresses":
              authDispatch({
                type: "SET_POLYGON_ADDRESSES",
                payload: res.addresses,
              });

              if (!res.alreadyExists) {
                const newNfts = await getNFTs(
                  res.newAddress,
                  "polygon",
                  user.uid
                );
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }
              if (!res.alreadyExists) {
                const newNfts = await getNFTs(res.newAddress, "eth", user.uid);
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }
              break;
            case "solanaAddresses":
              authDispatch({
                type: "SET_SOLANA_ADDRESSES",
                payload: res.addresses,
              });
              break;
            case "tezosAddresses":
              authDispatch({
                type: "SET_TEZOS_ADDRESSES",
                payload: res.addresses,
              });
              if (!res.alreadyExists) {
                const newNfts = await getNfts(
                  res.newAddress,
                  "tezos",
                  user.uid
                );
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }
              break;
            case "avalancheAddresses":
              authDispatch({
                type: "SET_AVALANCHE_ADDRESSES",
                payload: res.addresses,
              });
              if (!res.alreadyExists) {
                const newNfts = await getNFTs(
                  res.newAddress,
                  "avalanche",
                  user.uid
                );
                if (newNfts?.success) {
                  addNfts(newNfts?.nfts);
                }
              }
              break;
            default:
              break;
          }

          if (!res.alreadyExists) {
            toast({
              title: "Success",
              description: "New wallet address added",
              status: "success",
              duration: 3000,
              isClosable: true,
              variant: "left-accent",
            });
          }

          setIsNFTLoading(false);
        } else {
          toast({
            title: "Error",
            description: "Could not update wallet addresses. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            variant: "left-accent",
          });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, isAuthenticated]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("close", () => {
        logoutOfWeb3Modal();
      });

      window.ethereum.on("accountsChanged", (accounts: any) => {
        if (!accounts || !accounts.length) {
          return;
        }
        setWalletAddress({
          type: "ethAddresses",
          address: accounts[0],
        });
      });

      window.ethereum.on("chainChanged", (chainId: any) => {
        console.log("Chain changed:", chainId);
      });

      // return () => {
      //   window.ethereum.off("close");
      //   window.ethereum.off("accountsChanged");
      //   window.ethereum.off("chainChanged");
      // };
    }
  }, [logoutOfWeb3Modal]);

  return (
    <Web3Context.Provider
      value={{
        loadWeb3Modal,
        logoutOfWeb3Modal,
        loadTezos,
      }}
    >
      {isNFTLoading && <NftLoader />}
      {children}
    </Web3Context.Provider>
  );
}

export default function useWeb3(): Web3ContextValue {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

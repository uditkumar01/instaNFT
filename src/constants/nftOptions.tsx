import { Button } from "@chakra-ui/button";
import { SingletonRouter } from "next/router";
import { ReactNode } from "react";

export type INftOptions = {
  label?: string;
  onClick?: any;
  button?: ReactNode;
};

export const getNftOptions = (
  router: SingletonRouter,
  tokenAddress: string,
  tokenId: string,
  uid: string,
  toast: any,
  isAuthenticated: boolean,
  nftImage?: string
): Array<INftOptions> => [
  {
    label: "See more details",
    onClick: () => {
      if (router.pathname !== `/nft/${tokenAddress}/${tokenId}`) {
        router.push(`/nft/${tokenAddress}/${tokenId}`);
      }
    },
  },
  {
    label: "View on OpenSea",
    onClick: () => {
      const openSeaUrl = `https://opensea.io/assets/${tokenAddress}/${tokenId}`;
      window.open(openSeaUrl, "_blank");
    },
  },
  {
    label: "View on Etherscan",
    onClick: () => {
      const etherscanUrl = `https://etherscan.io/token/${tokenAddress}`;
      window.open(etherscanUrl, "_blank");
    },
  },
  {
    label: "Copy shareable link",
    onClick: async () => {
      await navigator.clipboard.writeText(
        `${process.env.REACT_APP_BASE_URL}/nft/${tokenAddress}`
      );
      toast({
        title: "Copied",
        description: "NFT link copied to clipboard",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
      });
    },
  },
];

/* eslint-disable max-len */
import { Divider, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { NftContainer, NftFooter, NftHeader, NftImage, NftInfo } from "..";
import useAuth, { IUser } from "../../context/Auth/Auth";
import { INFT } from "../../utils/Firestore/nft/addNfts";
import { generatePinataLink } from "../../utils/generatePinataLink";
import { getIpfsLink } from "../../utils/getIPFSLink";
import { pinNFTHandler } from "../../utils/pinNFTHandler";

interface IPinnedNFTProps extends INFT {
  likeHandler: any;
  likeNFTParams: any;
  isLiked: any;
}

export function PinnedNFT({
  owner,
  name,
  description,
  chain,
  metadata,
  tokenAddress,
  tokenId,
  assetUrl,
  uid,
  likeHandler,
  likeNFTParams,
  isLiked,
}: IPinnedNFTProps): JSX.Element {
  const [imageDetails, setImageDetails] = useState({
    height: 0,
    width: 0,
  });

  const { user, authDispatch } = useAuth();
  const toast = useToast();

  const nftFooterLinks = [
    {
      label: "OpenSea",
      href: `https://opensea.io/assets/${tokenAddress}/${tokenId}`,
    },
    {
      label: "Rarible",
      href: `https://rarible.com/token/${tokenAddress}:${tokenId}`,
    },
    {
      label: "Etherscan",
      href: `https://etherscan.io/address/${tokenAddress}`,
    },
  ];

  if (!owner || typeof owner === "string") {
    return <></>;
  }

  const imageUrl = getIpfsLink(generatePinataLink(assetUrl));

  return (
    <NftContainer>
      <NftImage
        h="full"
        align="flex-start"
        setImageDetails={setImageDetails}
        src={imageUrl}
        alt="nft image"
        flex="1"
        pos="relative"
        px={{
          base: "1rem",
          md: "20px",
          lg: "40px",
        }}
        maxW={{
          base: "600px",
          md: "600px",
        }}
        rounded="2xl"
        ml={{
          base: "0",
          md: "2rem",
        }}
        mb={{
          base: "3rem",
          md: "0",
        }}
      />
      <Stack
        flex="1"
        px={{
          base: "1rem",
          lg: "40px",
        }}
        w="full"
        maxW="600px"
      >
        <NftHeader
          avatar={owner?.photoURL}
          name={owner?.displayName || ""}
          key={`nft-header-${uid}`}
          isCurrentUser={user?.uid === owner?.uid}
          likeHandler={likeHandler}
          likeNFTParams={likeNFTParams}
          isLiked={isLiked}
          pinNFTHandler={pinNFTHandler}
          pinNFTParams={{
            toast,
            owner: owner as IUser,
            authDispatch,
            uid: uid || "",
          }}
          pinned
        />
        <Divider />
        <NftInfo
          key={`pinned-nft-info-${uid}`}
          title={name}
          description={description || "No description provided for this NFT"}
          chain={chain}
          height={imageDetails.height}
          width={imageDetails.width}
          tags={Object.entries(metadata || {})}
        />
        <NftFooter links={nftFooterLinks} />
      </Stack>
    </NftContainer>
  );
}

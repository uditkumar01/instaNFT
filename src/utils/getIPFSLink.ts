const BASE_PINATA_URL = "https://ipfs.io/ipfs/";

// ipfs link ipfs://ipfs/QmV6u1nDzvmNK3FSYrSfHusbtx6EXsXcDwJKhxAJbCPf6b/95.jpeg
export const getIpfsLink = (ipfsLink: string): string => {
  if (typeof ipfsLink !== "string") return ipfsLink;
  const regex = /(?<=[i]pfs:\/\/).*/;
  const [ipfsHash] = ipfsLink.match(regex) || [];
  if (ipfsHash) {
    return `${BASE_PINATA_URL}/${ipfsHash}`;
  }
  return ipfsLink;
};

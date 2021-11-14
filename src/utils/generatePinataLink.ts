const BASE_PINATA_URL = "https://gateway.pinata.cloud/";

// ipfs link ipfs://ipfs/QmV6u1nDzvmNK3FSYrSfHusbtx6EXsXcDwJKhxAJbCPf6b/95.jpeg
export const generatePinataLink = (ipfsLink: string): string => {
  if (typeof ipfsLink !== "string") return ipfsLink;
  const regex = /(?<=[i]pfs:\/\/ipfs).*/;
  const [ipfsHash] = ipfsLink.match(regex) || [];
  if (ipfsHash) {
    return `${BASE_PINATA_URL}ipfs/${ipfsHash}`;
  }
  return ipfsLink;
};

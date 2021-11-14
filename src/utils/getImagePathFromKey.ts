export const getImagePathFromKey = (key: string): string => {
  switch (key) {
    case "ethAddresses":
      return "/images/ethereum.png";
    case "tezosAddresses":
      return "/images/tezos.png";
    case "polygonAddresses":
      return "/images/polygon.png";
    case "solanaAddresses":
      return "/images/solana.png";
    case "avalancheAddresses":
      return "/images/avalanche.png";
    default:
      return "/images/ethereum.png";
  }
};

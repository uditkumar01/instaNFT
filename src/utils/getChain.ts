export const getChain = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return "ethAddresses";
    case 137:
      return "polygonAddresses";
    case 43114:
      return "avalancheAddresses";
    default:
      return "ethAddresses";
  }
};

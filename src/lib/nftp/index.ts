import axios from "axios";

const nftPortBaseUrl = `https://api.nftport.xyz`;

export const nftPortInstance = axios.create({
  baseURL: nftPortBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_NFT_PORT_KEY || "",
  },
});

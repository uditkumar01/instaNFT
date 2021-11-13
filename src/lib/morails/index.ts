import axios from "axios";

const moralisPortBaseUrl = `https://deep-index.moralis.io/api/v2`;

export const moralisPortInstance = axios.create({
  baseURL: moralisPortBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY || "",
  },
});

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { AuthProvider } from "../context/Auth/Auth";
import { Web3UtilityProvider } from "../context/Web3/Web3";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Web3UtilityProvider>
          <Component {...pageProps} />
        </Web3UtilityProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;

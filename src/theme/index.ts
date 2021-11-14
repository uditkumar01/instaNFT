import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";

export const theme = extendTheme({
  components: {
    Button,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brandLight: {
      50: "#FFFFFF",
      100: "#E3EEFF",
      200: "#C7DDFF",
      300: "#AACCFF",
      400: "#8EBBFF",
      500: "#72A9FF",
      600: "#5698FF",
      700: "#3987FF",
      800: "#1D76FF",
      900: "#0165FF",
    },
    brandDark: {
      50: "#0165FF",
      100: "#015AE3",
      200: "#014FC6",
      300: "#0143AA",
      400: "#01388E",
      500: "#002D71",
      600: "#002255",
      700: "#001639",
      800: "#000B1C",
      900: "#000000",
    },
    black: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#383838",
      800: "#2B2B2B",
      900: "#000000",
    },
  },
});

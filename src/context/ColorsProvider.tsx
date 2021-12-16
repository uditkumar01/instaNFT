import { useColorMode } from "@chakra-ui/color-mode";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getItem } from "../utils/localStorage/getItem";

interface ColorsProviderProps {
  children: ReactNode;
}

interface ColorContextValue {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

const ColorContext = createContext({} as ColorContextValue);

export function ColorProvider({ children }: ColorsProviderProps): JSX.Element {
  const [color, setColor] = useState("messenger");
  const { colorMode, setColorMode } = useColorMode();

  // Load theme from local storage
  useEffect(() => {
    const theme = getItem("instaNFTTheme") || colorMode;
    setColorMode(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export default function useColorProvider(): ColorContextValue {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorProvider must be used within a ColorProvider");
  }
  return context;
}

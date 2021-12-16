import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LanguageProviderProps {
  children: ReactNode;
}

interface LanguageContextValue {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
}

const LangugeContext = createContext({} as LanguageContextValue);

export function LangugeProvider({
  children,
}: LanguageProviderProps): JSX.Element {
  const [lang, setLang] = useState("en");
  return (
    <LangugeContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LangugeContext.Provider>
  );
}

export default function useLanguage(): LanguageContextValue {
  const context = useContext(LangugeContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

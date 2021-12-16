import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface IStoriesValue {
  pause: boolean;
  setPause: Dispatch<SetStateAction<boolean>>;
}

const StoriesContext = createContext({} as IStoriesValue);

export function StoriesWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [pause, setPause] = useState(false);
  return (
    <StoriesContext.Provider
      value={{
        pause,
        setPause,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
}

export default function useStories(): IStoriesValue {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error("useStories must be used within a StoriesWrapper");
  }
  return context;
}

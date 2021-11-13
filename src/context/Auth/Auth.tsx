import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { auth } from "../../Firebase";
import { createUserEntity } from "../../Firebase/User";
import { getUser } from "../../utils/Firestore/user/getUser";
import { authReducer, IAuthAction } from "./AuthReducer";

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  coverImageURL: string;
  username: string;
  colorScheme: string;
  bio: string;
  emailVerified: boolean;
  ethAddresses: string[];
  polygonAddresses: string[];
  tezosAddresses: string[];
  solanaAddresses: string[];
  avalancheAddresses: string[];
  followers: string[];
  following: string[];
  lastNftUpdateTime: string;
  createdAt: string;
  twitterLink?: string;
  linktreeLink?: string;
  websiteLink?: string;
  pinnedNFT?: string;
}

// for minimal user data in case we need only few properties
export interface IUserMinimal {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  coverImageURL?: string;
  username?: string;
  colorScheme?: string;
  bio?: string;
  emailVerified?: boolean;
  ethAddresses?: string[];
  polygonAddresses?: string[];
  tezosAddresses?: string[];
  solanaAddresses?: string[];
  avalancheAddresses?: string[];
  followers?: string[];
  following?: string[];
  lastNftUpdateTime?: string;
  createdAt?: string;
  twitterLink?: string;
  linktreeLink?: string;
  websiteLink?: string;
  pinnedNFT?: string;
}

export interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface IAuthContextValue extends IAuthContext {
  authDispatch: Dispatch<IAuthAction>;
}

export interface IAuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextValue);

const initialState = { isAuthenticated: false, isLoading: true, user: null };

export function AuthProvider({ children }: IAuthContextProps): JSX.Element {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // eslint-disable-next-line func-names
    const observer = auth().onAuthStateChanged(async function (user) {
      if (user) {
        const username = user?.email
          ?.split("@")[0]
          ?.trim()
          ?.replace(/[^a-zA-Z0-9_]/g, "")
          ?.toLowerCase();
        const currentDateISOSring = new Date().toISOString();
        const userDetails: IUser = {
          uid: username || user.uid,
          username: username || "",
          email: user?.email || "",
          displayName: user?.displayName?.toLowerCase() || "",
          photoURL: user?.photoURL || "",
          coverImageURL: "",
          colorScheme: "messenger",
          emailVerified: user?.emailVerified || false,
          ethAddresses: [],
          bio: "",
          polygonAddresses: [],
          tezosAddresses: [],
          solanaAddresses: [],
          avalancheAddresses: [],
          followers: [],
          following: [],
          lastNftUpdateTime: currentDateISOSring,
          createdAt: currentDateISOSring,
        };
        await createUserEntity(userDetails);
        const firestoreUserRes = await getUser(username);
        const firestoreUser = firestoreUserRes?.success
          ? firestoreUserRes?.user
          : {};
        const userPayload = {
          ...userDetails,
          ...firestoreUser,
        };
        authDispatch({
          type: "LOGIN",
          payload: true,
        });
        if (!userPayload?.coverImageURL) {
          userPayload.coverImageURL = "/images/coverInitial.png";
        }

        authDispatch({
          type: "SET_USER",
          payload: userPayload,
        });
      } else {
        authDispatch({
          type: "LOGIN",
          payload: false,
        });
      }
      authDispatch({
        type: "SET_LOADING",
        payload: false,
      });
    });

    return () => {
      observer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): IAuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

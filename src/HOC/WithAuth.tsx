import { NextComponentType } from "next";
import router from "next/router";
import { Loader } from "../components/Loader/Loader";
import useAuth from "../context/Auth/Auth";

export const WithAuth = (
  WrappedComponent: NextComponentType
): ((props: any) => JSX.Element | null) => {
  const WithAuthMiddleware = (props: any) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (typeof window !== "undefined") {
      if (isLoading) {
        return <Loader />;
      }
      if (!isAuthenticated) {
        router.push("/auth/login");
        return <Loader />;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
  return WithAuthMiddleware;
};

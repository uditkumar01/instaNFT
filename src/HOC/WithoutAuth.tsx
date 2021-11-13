import { NextComponentType } from "next";
import router from "next/router";
import { Loader } from "../components/Loader/Loader";
import useAuth from "../context/Auth/Auth";

export const WithoutAuth = (
  WrappedComponent: NextComponentType
): ((props: any) => JSX.Element | null) => {
  const WithoutAuthMiddleware = (props: any) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (typeof window !== "undefined") {
      if (isLoading) {
        return <Loader />;
      }
      if (isAuthenticated) {
        router.push("/profile");
        return <Loader />;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
  return WithoutAuthMiddleware;
};

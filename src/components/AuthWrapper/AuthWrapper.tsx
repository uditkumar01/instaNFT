import { ReactNode } from "react";
import useAuth from "../../context/Auth/Auth";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({
  children,
}: AuthWrapperProps): JSX.Element | null {
  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading && isAuthenticated) {
    return <>{children}</>;
  }
  return null;
}

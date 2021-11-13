import { ReactNode } from "react";
import useAuth from "../../context/Auth/Auth";

export function OnlyOwnerWrapper({
  children,
  uid,
}: {
  children: ReactNode;
  uid: string;
}): JSX.Element | null {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user?.uid === uid) {
    return <>{children}</>;
  }
  return null;
}

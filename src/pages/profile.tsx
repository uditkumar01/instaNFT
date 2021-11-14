import router from "next/router";
import { useEffect } from "react";
import { Loader } from "../components";
import useAuth from "../context/Auth/Auth";
import { WithAuth } from "../HOC/WithAuth";

function Profile(): JSX.Element {
  const { user } = useAuth();

  useEffect(() => {
    router.replace(`/u/${user?.username}`);
  }, []);

  return <Loader />;
}

export default WithAuth(Profile);

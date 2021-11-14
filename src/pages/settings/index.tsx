import router from "next/router";
import { useEffect } from "react";
import { Loader } from "../../components";
import { WithAuth } from "../../HOC/WithAuth";

function Settings(): JSX.Element {
  useEffect(() => {
    router.replace(`/settings/account`);
  }, []);

  return <Loader />;
}

export default WithAuth(Settings);

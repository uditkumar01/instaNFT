import { Error, Layout } from "../components";
import useColorProvider from "../context/ColorsProvider";

function Error404(): JSX.Element {
  const { color } = useColorProvider();
  return (
    <Layout title="404">
      <Error color={color} />
    </Layout>
  );
}

export default Error404;

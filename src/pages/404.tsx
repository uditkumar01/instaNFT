import { Error, Layout } from "../components";

function Error404(): JSX.Element {
  const color = "twitter";
  return (
    <Layout title="404">
      <Error color={color} />
    </Layout>
  );
}

export default Error404;

import { Error, Layout } from "../components";

function Error404(): JSX.Element {
  return (
    <Layout title="404">
      <Error />
    </Layout>
  );
}

export default Error404;

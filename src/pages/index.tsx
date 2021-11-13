import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout, Loader } from "../components";

const importOpts = {
  // ssr: false,
  loading: () => <Loader />,
};

const LandingIntro = dynamic(
  () => import("../sections/Intro/Intro"),
  importOpts
);

const Home: NextPage = () => {
  return (
    <Layout title="instaNFT : NFT Social Network">
      <LandingIntro />
    </Layout>
  );
};

export default Home;

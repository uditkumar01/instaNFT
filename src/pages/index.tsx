import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Footer, Layout, Loader } from "../components";

const importOpts = {
  // ssr: false,
  loading: () => <Loader />,
};

const LandingIntro = dynamic(
  () => import("../sections/Intro/Intro"),
  importOpts
);
const PhoneSection = dynamic(
  () => import("../sections/Phone/Phone"),
  importOpts
);
const SocializeNFTSection = dynamic(
  () => import("../sections/SocializeNFT/SocializeNFT"),
  importOpts
);
const FeaturedNfts = dynamic(
  () => import("../sections/FeaturedNfts/FeaturedNfts"),
  importOpts
);

const Home: NextPage = () => {
  return (
    <Layout title="instaNFT : NFT Social Network">
      <LandingIntro />
      <PhoneSection />
      <SocializeNFTSection />
      <FeaturedNfts />
      <Footer />
    </Layout>
  );
};

export default Home;

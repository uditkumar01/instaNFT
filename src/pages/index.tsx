import type { NextPage } from "next";
import { Footer, Layout, Loader } from "../components";
import FeaturedNfts from "../sections/FeaturedNfts/FeaturedNfts";
import LandingIntro from "../sections/Intro/Intro";
import PhoneSection from "../sections/Phone/Phone";
import SocializeNFTSection from "../sections/SocializeNFT/SocializeNFT";

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

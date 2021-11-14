import { Box, Flex } from "@chakra-ui/layout";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { MenuBar, Navbar } from "..";

const defaultKeywords =
  // eslint-disable-next-line max-len
  "nft, social, social network, gallery, nft gallery, nft social network, cross chain gallery";

export function Layout({
  children,
  title,
  keywords,
  overrideColor,
  description,
  expandedNav,
}: {
  children: React.ReactNode;
  title: string;
  overrideColor?: string;
  keywords?: string;
  description?: string;
  expandedNav?: boolean;
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  // scrolling to top of page
  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* best tags for improving SEO 2021 */}
        <meta
          name="description"
          content={description || "A multi-chain NFT Social Network"}
        />
        <meta
          name="keywords"
          content={`${defaultKeywords} ${keywords || ""}`}
        />
        <meta name="theme-color" content="#1a202c, #ffffff" />
        <meta name="author" content="InstaNFT" />
        <meta name="copyright" content="InstaNFT" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta name="webcrawlers" content="all" />
        <meta name="spiders" content="all" />
        <meta name="distribution" content="global" />
        <meta name="category" content="social" />

        {/* logo link tags */}
        <link rel="shortcut icon" href="/favicon/instanftLogo.ico?v=0.3" />
        <link
          rel="icon"
          sizes="16x16 32x32 64x64"
          href="/favicon/instanftLogo.ico?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/favicon/instanftLogo-192.png?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="160x160"
          href="/favicon/instanftLogo-160.png?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/instanftLogo-96.png?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon/instanftLogo-64.png?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/instanftLogo-32.png?v=0.3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/instanftLogo-16.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon/instanftLogo-57.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/instanftLogo-114.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/instanftLogo-72.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/instanftLogo-144.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/instanftLogo-60.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/instanftLogo-120.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/instanftLogo-76.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/instanftLogo-152.png?v=0.3"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/instanftLogo-180.png?v=0.3"
        />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/instanftLogo-144.png?v=0.3"
        />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
      </Head>
      <Flex
        height="100vh"
        width="100vw"
        direction="column"
        pos="relative"
        overflowX="hidden"
        ref={containerRef}
        className="flex-layout-container"
      >
        <Navbar overrideColor={overrideColor} expandedNav={expandedNav} />
        {expandedNav && <MenuBar />}
        <Box flex="1" p={9} />
        {children}
      </Flex>
    </>
  );
}

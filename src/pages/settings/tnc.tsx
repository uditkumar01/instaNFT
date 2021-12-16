import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import markdownIt from "markdown-it";
import parser from "html-react-parser";
import { Layout, Sidebar } from "../../components";
import { getTNCData } from "../../lib/tnc";
import styles from "../../styles/tnc.module.css";

function TNC({
  ppData: { content },
}: {
  ppData: {
    content: string;
  };
}): JSX.Element {
  return (
    <Layout
      title="instaNFT | Connect Wallet"
      key="connect-wallet-page"
      keywords="instanft, connect, wallet"
      description="Connect your wallet to start using instaNFT"
      expandedNav
    >
      <Flex w="full" h="full" justify="center" align="center">
        <Flex w="full" h="full" maxW="1400px">
          <Sidebar />
          <Stack
            w="full"
            h="full"
            maxW="1400px"
            spacing={9}
            mt="3rem"
            mx={{
              base: 4,
              md: 10,
              lg: 16,
            }}
          >
            <Flex w="full" flexDir="column" mb="1rem">
              <Heading
                fontSize="1.8rem"
                fontWeight="bold"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Terms and Conditions
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Please read the following terms and conditions carefully.
              </Text>
              <Flex
                w="full"
                flexDir="column"
                maxW="930px"
                className={`${styles.tncText} tnc-text`}
              >
                {parser(markdownIt().render(content))}
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: {
    ppData: {
      content: string;
    };
  };
}> {
  const ppData = getTNCData("tnc");
  return {
    props: {
      ppData,
    },
  };
}

export default TNC;

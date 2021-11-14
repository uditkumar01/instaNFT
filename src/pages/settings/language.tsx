import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { Layout, Sidebar } from "../../components";
import { WithAuth } from "../../HOC/WithAuth";

function Language(): JSX.Element {
  return (
    <Layout
      title="Language"
      key="language-page"
      keywords="Language Settings, Language Settings Page"
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
            my="3rem"
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
                Display Language
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Select your preferred language for headlines, buttons, and other
                text from instaNFT.
              </Text>
              <Flex w="full" flexDir="column" maxW="930px">
                <Flex
                  mt="2rem"
                  border="1px solid"
                  p="0.8rem 1.3rem"
                  rounded="md"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  justify="space-between"
                  align="center"
                  transition="all 0.2s"
                  cursor="pointer"
                  _hover={{
                    bg: useColorModeValue("gray.50", "gray.700"),
                  }}
                >
                  <Box>
                    <Heading
                      fontSize="1.1rem"
                      fontWeight="semibold"
                      color={useColorModeValue("gray.700", "gray.300")}
                    >
                      Select your language
                    </Heading>
                    <Text color="gray.500" fontSize="sm" mt="0.4rem">
                      English
                    </Text>
                  </Box>
                  <Box>
                    <Icon
                      as={FaChevronCircleRight}
                      fontSize="1.2rem"
                      color="gray.500"
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default WithAuth(Language);

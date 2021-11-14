import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Layout, Sidebar } from "../../components";
import useAuth from "../../context/Auth/Auth";
import { WithAuth } from "../../HOC/WithAuth";
// eslint-disable-next-line max-len
import { updateUserColorScheme } from "../../utils/Firestore/user/updateUserColorScheme";
import { setItem } from "../../utils/localStorage/setItem";

function Settings(): JSX.Element {
  const { setColorMode, colorMode } = useColorMode();
  const { user } = useAuth();
  const bgColor = `${color}.500`;
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Layout title="Settings" expandedNav>
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
                Choose Theme
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Select your preferred theme for the app.
              </Text>
              <Flex w="full" flexDir="column" maxW="930px">
                <Flex mt="2rem" flexWrap="wrap">
                  {themes.map((colorItem) => {
                    return (
                      <Box
                        key={colorItem.name}
                        bg={
                          colorMode === colorItem.name ? bgColor : "transparent"
                        }
                        onClick={() => {
                          setColorMode(colorItem.name);
                          setItem("instaNFTTheme", colorItem.name);
                        }}
                        p="3px"
                        w="100px"
                        h="100px"
                        rounded="1.2rem"
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ bg: bgColor }}
                        mx="0.8rem"
                        boxShadow="xl"
                      >
                        <Box
                          bg={colorItem.colorCode}
                          border="3px solid"
                          borderColor={borderColor}
                          w="full"
                          h="full"
                          rounded="1rem"
                        />
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
            <Divider />
            <Flex w="full" flexDir="column">
              <Heading
                fontSize="1.8rem"
                fontWeight="bold"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Choose Color
              </Heading>
              <Text color="gray.500" fontSize="sm" mt="0.4rem">
                Select a color according to your preference.
              </Text>
              <Flex w="full" flexDir="column">
                <Flex mt="1.3rem" gap="1rem" flexWrap="wrap">
                  {colors.map((colorItem) => {
                    return (
                      <Box
                        key={colorItem.name}
                        bg={color === colorItem.name ? bgColor : "transparent"}
                        onClick={() => {
                          setColor(colorItem.name);
                          updateUserColorScheme(user?.uid, colorItem.name);
                        }}
                        p="3px"
                        w="70px"
                        h="70px"
                        rounded="full"
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ bg: bgColor }}
                        m="0.6rem"
                        boxShadow="xl"
                      >
                        <Box
                          bg={colorItem.colorCode}
                          border="3px solid"
                          borderColor={borderColor}
                          w="full"
                          h="full"
                          rounded="full"
                        />
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default WithAuth(Settings);

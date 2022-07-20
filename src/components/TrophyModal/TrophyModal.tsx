import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tooltip } from "@chakra-ui/tooltip";
import React from "react";
import { RiTrophyLine } from "react-icons/ri";
import { NoItemsFound } from "..";
import { trophiesData } from "../../data/trophiesData";

export function TrophyModal(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [trophies, setTrophies] = React.useState<Array<any>>([]);
  // TODO: use useState once we have a dynamic list of trophies
  const trophies: Array<any> = [];

  return (
    <>
      <IconButton
        icon={<RiTrophyLine fontSize="1.2rem" />}
        rounded="full"
        onClick={onOpen}
        mx={2}
        bg="transparent"
        transition="all 0.2s ease"
        aria-label="Trophy button"
        color={useColorModeValue("gray.700", "gray.200")}
        _hover={{
          color: useColorModeValue("gray.800", "gray.200"),
          bg: useColorModeValue("gray.300", "gray.600"),
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Tabs isFitted>
              <TabList>
                <Tab>Trophies</Tab>
                <Tab>Claim Rewards</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {trophies?.length > 0 ? (
                    <SimpleGrid columns={[1, 2, 3]} gap={4}>
                      {trophies.map((trophy: any) => {
                        return (
                          <Flex
                            key={trophy.id}
                            align="center"
                            justify="space-between"
                            p={2}
                            borderBottom="1px solid"
                            borderColor="gray.200"
                            w="full"
                            h="100px"
                            bg="red"
                          >
                            {" "}
                          </Flex>
                        );
                      })}
                    </SimpleGrid>
                  ) : (
                    <NoItemsFound text="Coming Soon" btnInivisible />
                  )}
                </TabPanel>
                <TabPanel>
                  {Object.values(trophiesData).map((trophy: any) => {
                    return (
                      <Flex
                        h="50px"
                        align="center"
                        key={trophy.label}
                        justifyContent="space-between"
                      >
                        <Text>{trophy?.label}</Text>
                        <Tooltip label="Coming Soon" hasArrow arrowSize={8}>
                          <Button
                            colorScheme="twitter"
                            isDisabled={trophy?.isDisabled}
                          >
                            Claim
                          </Button>
                        </Tooltip>
                      </Flex>
                    );
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { ModalBody } from "@chakra-ui/modal";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import { Avatar } from "@chakra-ui/avatar";
import { CgFileDocument } from "react-icons/cg";
import { QueryCard } from "..";
import { fadeInVariants } from "../../animations/fadeIn";

interface QueryResultsProps {
  results: any[];
  title: string;
  onClose: () => void;
  callback?: any;
  queryCardIcon?: any;
}

export function QueryResults({
  title,
  results,
  onClose,
  callback,
  queryCardIcon,
}: QueryResultsProps): JSX.Element {
  const titleTextColor = useColorModeValue("gray.600", "gray.200");
  const iconBg = useColorModeValue("gray.300", "gray.800");
  return (
    <>
      {results.length > 0 && (
        <ModalBody mt="0.6rem" px="0">
          <Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <motion.h2
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AccordionButton>
                      <Text
                        flex="1"
                        fontSize="1.1rem"
                        textAlign="left"
                        fontWeight={800}
                        color={titleTextColor}
                        textTransform="capitalize"
                      >
                        {title}
                      </Text>
                      {isExpanded ? (
                        <BiMinus fontSize="12px" />
                      ) : (
                        <AiOutlinePlus fontSize="12px" />
                      )}
                    </AccordionButton>
                  </motion.h2>
                  <AccordionPanel pb={4} maxH="60vh" overflow="auto">
                    <Stack gap={2}>
                      {results?.map((item: any) => {
                        return (
                          <QueryCard
                            key={`${item?.uid}-search-result`}
                            title={
                              item?.displayName || item?.username || item?.name
                            }
                            subTitle={
                              item?.chain ||
                              item?.username ||
                              `${item?.items?.length} collectibles`
                            }
                            callback={() => {
                              if (onClose) onClose();
                              if (callback) callback(item);
                            }}
                            rightIcon={
                              queryCardIcon ? queryCardIcon(item) : null
                            }
                            icon={
                              <>
                                {item?.queryType === "user" ? (
                                  <Avatar
                                    src={item?.photoURL}
                                    name={item?.username}
                                    size="md"
                                  />
                                ) : (
                                  <Flex
                                    w="48px"
                                    h="48px"
                                    justifyContent="center"
                                    alignItems="center"
                                    bg={iconBg}
                                    rounded="full"
                                  >
                                    <CgFileDocument fontSize="1.5rem" />
                                  </Flex>
                                )}
                              </>
                            }
                          />
                        );
                      })}
                    </Stack>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </ModalBody>
      )}
    </>
  );
}

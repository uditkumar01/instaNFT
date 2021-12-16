import Image from "next/image";
import { Flex, Text } from "@chakra-ui/layout";

export const StoryProfile = (): JSX.Element => (
  <>
    <Flex pt={5} px={2} align="center">
      {/* <Avatar size="sm" src="/images/logo_blue.png" boxShadow="xl" /> */}
      <Image
        src="/images/logo_blue.png"
        alt="Logo"
        width={30}
        height={30}
        objectFit="cover"
        objectPosition="center"
      />
      <Text ml={2} fontWeight="700">
        instaNFT
      </Text>
    </Flex>
  </>
);

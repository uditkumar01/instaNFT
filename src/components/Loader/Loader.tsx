import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export function Loader(): JSX.Element {
  return (
    <Center
      w="100%"
      h="100%"
      pos="fixed"
      top="0"
      left="0"
      zIndex="10"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Spinner size="xl" />
    </Center>
  );
}

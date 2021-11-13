import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/alert";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";

export function NftLoader(): JSX.Element {
  return (
    <Flex
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      zIndex="30"
      justify="center"
      align="center"
    >
      <Box
        pos="absolute"
        w="100%"
        h="100%"
        bg={useColorModeValue("gray.50", "gray.900")}
        opacity="0.7"
        zIndex="-1"
      />
      <Box
        rounded="md"
        maxW={["90%", "75%", "75%", "50%", "30%"]}
        mx="auto"
        mt="3rem"
        shadow="base"
        overflow="hidden"
        boxShadow="lg"
      >
        <Progress size="xs" isIndeterminate />
        <Alert
          bg={useColorModeValue("gray.50", "gray.900")}
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          border="2px solid"
          borderTop="none"
          rounded="md"
          borderColor={useColorModeValue("gray.300", "gray.700")}
          borderTopRadius="0"
        >
          <Box className="coffee_cup" />
          <AlertTitle mt={0} mb={1} fontSize="lg">
            Please wait while we load your NFTs
          </AlertTitle>
          <AlertDescription
            maxWidth="sm"
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            It will take a few seconds.
          </AlertDescription>
        </Alert>
      </Box>
    </Flex>
  );
}

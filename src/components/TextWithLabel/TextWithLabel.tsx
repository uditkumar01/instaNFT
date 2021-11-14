import { Badge, Flex, Text } from "@chakra-ui/layout";

interface TextWithLabelProps {
  label: string;
  value: string;
}

export function TextWithLabel({
  label,
  value,
}: TextWithLabelProps): JSX.Element {
  return (
    <Badge variant="subtle" textTransform="none" rounded="lg" bg="transparent">
      <Flex flexDir="column" alignItems="flex-start" p="0.3rem 0rem">
        <Text
          fontWeight={500}
          fontSize="0.8rem"
          maxW="200px"
          color="gray.500"
          isTruncated
        >
          {label}
        </Text>
        <Text
          textTransform="capitalize"
          fontWeight={400}
          fontSize="md"
          maxW="200px"
          isTruncated
        >
          {value}
        </Text>
      </Flex>
    </Badge>
  );
}

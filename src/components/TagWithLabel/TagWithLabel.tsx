/* eslint-disable max-len */
import { useColorMode } from "@chakra-ui/color-mode";
import { Badge, Flex, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import parser from "html-react-parser";
import useColorProvider from "../../context/ColorsProvider";
import { formatDate } from "../../utils/formatDate";
import { linkify } from "../../utils/linkify";

export type TagWithLabelProps = { tag: [string, string] };

export function TagWithLabel({ tag }: TagWithLabelProps): JSX.Element {
  const { color } = useColorProvider();
  const { colorMode } = useColorMode();
  if (!tag || tag.length < 2) return <></>;
  const [label, value] = tag;
  if (!label || !value) return <></>;
  // 2021-11-08T14:07:16.118Z here is an example of a date
  const isDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/i.test(
    value
  );
  const parsedDate = isDateFormat ? formatDate(new Date(value)) : "";

  return (
    <Tooltip label={parsedDate || value} hasArrow>
      <Badge
        colorScheme={color}
        variant="subtle"
        textTransform="none"
        rounded="lg"
        m="0.3rem"
        boxShadow={
          colorMode === "light"
            ? " -3px -3px 3px rgba(255,255,255,0.2), 3px 3px 3px rgba(255,255,255,0.2), 0px 0px 0px 2px rgba(0,0,0,0.05)"
            : "inset -3px -3px 3px rgba(23, 25, 35, 0.1), inset 3px 3px 3px rgba(0, 0, 0, 0.1) 0px 0px 0px 2px rgba(255,255,255,0.05)"
        }
      >
        <Flex flexDir="column" alignItems="flex-start" p="0.3rem 0.5rem">
          <Text
            fontWeight={600}
            fontSize="0.8rem"
            textTransform="uppercase"
            maxW="200px"
            isTruncated
          >
            {label?.replace(/_/g, " ")}
          </Text>
          <Text fontWeight={400} fontSize="sm" maxW="200px" isTruncated>
            {parsedDate || parser(linkify((value || "").toString()))}
          </Text>
        </Flex>
      </Badge>
    </Tooltip>
  );
}

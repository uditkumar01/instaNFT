import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, FlexProps } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface NftContainerProps extends FlexProps {
  children: ReactNode;
}

export function NftContainer({
  children,
  ...props
}: NftContainerProps): JSX.Element {
  return (
    <Flex
      py={20}
      w="full"
      // h="full"
      bg={useColorModeValue("gray.100", "gray.900")}
      justify="center"
      align={{
        base: "center",
        md: "flex-start",
      }}
      mb="1.5rem"
      {...props}
    >
      <Flex
        w="full"
        h="full"
        justify="center"
        align="center"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}

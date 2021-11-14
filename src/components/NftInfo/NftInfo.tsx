import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { ShowMore, TextWithLabel, TagWithLabel } from "..";
import { TagWithLabelProps } from "../TagWithLabel/TagWithLabel";

interface NftInfoProps {
  title: string;
  description: string;
  tags: Array<TagWithLabelProps["tag"]>;
  chain: string;
  width: number;
  height: number;
}

export function NftInfo({
  width,
  height,
  title,
  description,
  chain,
  tags,
}: NftInfoProps): JSX.Element {
  return (
    <>
      <Heading
        fontWeight={700}
        fontSize={{
          base: "2xl",
          sm: "3xl",
          md: "4xl",
          lg: "5xl",
        }}
        mb={{
          base: "1rem",
          md: "1.2rem",
        }}
        py={{
          base: "0.2rem",
          md: "0.3rem",
          lg: "0.5rem",
        }}
        textTransform="capitalize"
      >
        {title}
      </Heading>
      <Text
        fontSize={{
          base: "md",
          md: "md",
          lg: "lg",
        }}
        fontWeight={300}
        color={useColorModeValue("gray.700", "gray.400")}
      >
        <ShowMore text={description} maxLength={155} />
      </Text>
      <Flex py="0.5rem" maxW="300px">
        <Flex py="1rem" justify="space-between" w="full">
          <TextWithLabel label="Dimensions" value={`${width} × ${height}`} />
          <TextWithLabel label="Chain" value={chain} />
        </Flex>
      </Flex>
      <Flex pos="relative" right="0.3rem" w="full" flexWrap="wrap">
        {tags.map((tag) => (
          <TagWithLabel key={`property-tag-${tag[0]}`} tag={tag} />
        ))}
      </Flex>
    </>
  );
}

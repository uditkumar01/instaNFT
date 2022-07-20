import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/system";
import React from "react";

export const EmailLoginForm = (props: HTMLChakraProps<"form">): JSX.Element => (
  <chakra.form width="full" {...props}>
    <FormControl>
      <FormLabel
        fontWeight="medium"
        fontSize="sm"
        mb="3"
        textAlign="center"
        color={useColorModeValue("gray.500", "gray.400")}
      >
        or continue with email
      </FormLabel>
      <Stack gap={0}>
        <Input
          placeholder="Email address"
          _placeholder={{ color: useColorModeValue("gray.600", "gray.400") }}
          borderBottomRadius="none"
        />
        <Input
          placeholder="Password"
          borderTopRadius="none"
          type="password"
          pos="relative"
          top="-1px"
          _placeholder={{ color: useColorModeValue("gray.600", "gray.400") }}
        />
      </Stack>
    </FormControl>
    <Button
      mt="6"
      isFullWidth
      fontSize="sm"
      fontWeight="bold"
      colorScheme="messenger"
      type="submit"
      // isDisabled
      aria-label="Login with email"
    >
      Continue
    </Button>
  </chakra.form>
);

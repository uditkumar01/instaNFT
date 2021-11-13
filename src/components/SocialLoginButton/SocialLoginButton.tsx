import { ButtonProps } from "@chakra-ui/button";
import { Button } from "@chakra-ui/react";
import React from "react";

export const SocialLoginButton = (props: ButtonProps): JSX.Element => {
  return (
    <Button
      fontSize="sm"
      fontWeight="bold"
      size="lg"
      iconSpacing="3"
      width="full"
      {...props}
      aria-label="Login with Google"
    >
      Continue with Google
    </Button>
  );
};

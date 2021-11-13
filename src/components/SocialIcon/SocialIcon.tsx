import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ReactElement } from "react";

interface SocialIconProps {
  icon: ReactElement;
  href: string;
}

export function SocialIcon({ icon, href }: SocialIconProps): JSX.Element {
  return (
    <IconButton
      onClick={() => window.open(href, "_blank")}
      icon={icon}
      rounded="full"
      bg="transparent"
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      color={useColorModeValue("gray.500", "gray.400")}
      aria-label="Home"
    />
  );
}

import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useState } from "react";
import { INftBtns } from "../../constants/nftCardLikeAndComment";

interface ICustomIconButton extends INftBtns {
  nftId: string;
}

export function CustomIconButton({
  callback,
  nftId,
  ...props
}: ICustomIconButton): JSX.Element {
  const [inProgress, setInProgress] = useState(false);
  return (
    <IconButton
      onClick={async () => {
        setInProgress(true);
        await callback(nftId);
        setInProgress(false);
      }}
      bg="transparent"
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
      {...props}
      isLoading={inProgress}
    />
  );
}

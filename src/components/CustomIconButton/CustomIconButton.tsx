import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { motion } from "framer-motion";
import { useState } from "react";
import { zoomInVariants } from "../../animations/zoomIn";
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
    <motion.div variants={zoomInVariants} initial="hidden" animate="visible">
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
    </motion.div>
  );
}

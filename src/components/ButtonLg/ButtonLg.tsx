import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { zoomInVariants } from "../../animations/zoomIn";
import useColorProvider from "../../context/ColorsProvider";

export function ButtonLg({
  icon,
  label,
  callback,
  btnTheme,
  ...props
}: {
  icon?: ReactNode;
  label?: string;
  callback: () => any;
  btnTheme?: { [key: string]: any };
  [key: string]: any;
}): JSX.Element {
  const { color } = useColorProvider();

  return (
    <motion.div variants={zoomInVariants} initial="hidden" animate="visible">
      <Button
        rounded="full"
        pos="relative"
        fontSize={["2xl", "2xl", "3xl", "3xl", "4xl", "4xl", "5xl"]}
        outline="none"
        p={[
          "1.9rem 2.4rem",
          "1.9rem 2.4rem",
          "2.5rem 3rem",
          "2.5rem 3rem",
          "2.5rem 3rem",
          "2.5rem 3rem",
          "3rem 3.5rem",
        ]}
        border="5px solid"
        borderColor={useColorModeValue(
          "rgba(0,0,0,0.5)",
          "rgba(255,255,255,0.5)"
        )}
        transition="all 0.3s"
        onClick={() => callback && callback()}
        aria-label={label}
        colorScheme={color}
      >
        {label && (
          <Text pos="relative" fontWeight="400" bg="red">
            {label}
          </Text>
        )}
        {icon}
      </Button>
    </motion.div>
  );
}

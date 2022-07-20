import { FormHelperText } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInVariants } from "../../animations/fadeIn";

export function FieldError({ error }: { error: string }): JSX.Element {
  const comp: any =
    error?.length > 0 ? (
      <motion.p
        variants={fadeInVariants}
        key={`animated-${error}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <FormHelperText color="red.500">{error}</FormHelperText>
      </motion.p>
    ) : null;
  return (
    <Box minH="22px" maxH="22px">
      <AnimatePresence>{comp}</AnimatePresence>
    </Box>
  );
}

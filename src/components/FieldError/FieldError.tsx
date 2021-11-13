import { FormHelperText } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";

export function FieldError({ error }: { error: string }): JSX.Element {
  return (
    <Box minH="22px" maxH="22px">
      {error?.length > 0 && (
        <FormHelperText color="red.500">{error}</FormHelperText>
      )}
    </Box>
  );
}

import { Box, Heading, Stack, StackProps } from "@chakra-ui/layout";

interface FieldGroupProps extends StackProps {
  title?: string;
}

export function FieldGroup({
  title,
  children,
  ...flexProps
}: FieldGroupProps): JSX.Element {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  );
}

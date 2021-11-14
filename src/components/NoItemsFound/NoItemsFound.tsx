import { Button } from "@chakra-ui/button";
import { Center, Heading, Link } from "@chakra-ui/layout";

export function NoItemsFound({
  text,
  btnText,
  href,
  color,
  btnInivisible,
  isLoading,
}: any): JSX.Element | null {
  if (isLoading) {
    return null;
  }
  return (
    <Center flexDir="column" mt="3rem" pb="2rem">
      <Heading
        fontSize={{
          base: "1.6rem",
          md: "2rem",
        }}
        color="gray.500"
      >
        {text}
      </Heading>
      {!btnInivisible && (
        <Button
          colorScheme={color}
          mt="2rem"
          as={Link}
          href={href}
          aria-label={btnText}
        >
          {btnText}
        </Button>
      )}
    </Center>
  );
}

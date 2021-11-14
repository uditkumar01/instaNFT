import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Link from "next/link";
import router from "next/router";
import styles from "../../styles/error404.module.css";

export function Error({
  path,
  message,
  color,
}: {
  path?: string;
  message?: string;
  color?: string;
}): JSX.Element {
  return (
    <Flex
      align="center"
      justify={{ base: "center" }}
      direction={{ base: "column", md: "column", sm: "column" }}
      minH="100vh"
    >
      <Box
        padding={{ base: "0", md: "2rem" }}
        w="full"
        className={styles.content}
      >
        <svg viewBox="0 0  960 270">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="70%">
              404
            </text>
          </symbol>

          <g className={styles.gAnts}>
            <use xlinkHref="#s-text" className={styles.text} />
            <use xlinkHref="#s-text" className={styles.text} />
            <use xlinkHref="#s-text" className={styles.text} />
            <use xlinkHref="#s-text" className={styles.text} />
            <use xlinkHref="#s-text" className={styles.text} />
          </g>
        </svg>
      </Box>

      <Flex margin="2rem" flexDirection="column" align="center">
        <Heading as="h3" size="lg" w="full" textAlign="center" fontWeight={500}>
          {message || "Oops! The page you’re trying to reach doesn’t exist."}
        </Heading>

        <Button
          colorScheme={color || "blue"}
          my="3rem"
          onClick={() => {
            router.push("/");
          }}
          aria-label="Go to home page"
        >
          Go back to Home
        </Button>
      </Flex>
    </Flex>
  );
}

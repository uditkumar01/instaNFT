import { useColorModeValue } from "@chakra-ui/color-mode";
import { chakra } from "@chakra-ui/system";
import { useState } from "react";

export function ShowMore({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}): JSX.Element {
  const [showFullText, setShowFullText] = useState(false);
  const isTextLong = text.length > 155;
  const moreBtnColor = useColorModeValue("gray.900", "gray.50");
  return (
    <>
      {isTextLong && !showFullText ? (
        <>
          {showFullText ? text : `${text.slice(0, maxLength)}...`}
          &nbsp;
          <chakra.span
            color={moreBtnColor}
            fontWeight="300"
            cursor="pointer"
            fontSize={{
              base: "0.95rem",
              md: "1rem",
              lg: "1.1rem",
            }}
            onClick={() => setShowFullText((prev) => !prev)}
          >
            more
          </chakra.span>
        </>
      ) : (
        text
      )}
    </>
  );
}

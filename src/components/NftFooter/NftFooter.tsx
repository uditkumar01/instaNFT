import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { GoLinkExternal } from "react-icons/go";
import { AnchorLink } from "..";

interface NftFooterProps {
  links: {
    href: string;
    label: string;
  }[];
}

const color = "twitter";

export function NftFooter({ links }: NftFooterProps): JSX.Element {
  const linkTextColor = useColorModeValue(`${color}.500`, `${color}.300`);
  return (
    <Flex flex="1" pt="1rem" flexWrap="wrap">
      {links.map(({ label, href }, index) => (
        <AnchorLink
          key={`nft-link-${label}`}
          href={href}
          icon={<Icon as={GoLinkExternal} size="1.2rem" />}
          label={label}
          linkProps={{
            d: "flex",
            mx: index === 0 || index === links.length - 1 ? "0" : "1rem",
            alignItems: "center",
            color: linkTextColor,
          }}
          labelProps={{
            fontWeight: 400,
            mr: "0.4rem",
          }}
        />
      ))}
    </Flex>
  );
}

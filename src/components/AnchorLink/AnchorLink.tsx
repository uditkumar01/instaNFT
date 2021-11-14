import { Link, Text } from "@chakra-ui/layout";
import { ReactElement } from "react";

interface AnchorLinkProps {
  icon: ReactElement;
  href: string;
  label: string;
  linkProps?: any;
  labelProps?: any;
}

export function AnchorLink({
  icon,
  href,
  label,
  linkProps,
  labelProps,
}: AnchorLinkProps): JSX.Element {
  return (
    <Link href={href} {...linkProps} isExternal>
      <Text fontWeight={400} mr="0.4rem" {...labelProps}>
        {label}
      </Text>
      {icon}
    </Link>
  );
}

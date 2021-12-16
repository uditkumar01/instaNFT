import Image from "next/image";
import useColorProvider from "../../context/ColorsProvider";
import { getThemeLogoName } from "../../utils/getThemeLogoName";

export function Logo({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}): JSX.Element {
  const { color } = useColorProvider();
  return (
    <>
      <Image
        className={className || ""}
        src={getThemeLogoName(color)}
        alt="logo"
        height={height || width || "40px"}
        width={width || height || "40px"}
        objectFit="contain"
      />
    </>
  );
}

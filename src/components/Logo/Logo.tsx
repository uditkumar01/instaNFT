import Image from "next/image";

export function Logo({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}): JSX.Element {
  return (
    <>
      <Image
        className={className || ""}
        src="/images/logo_blue.png"
        alt="logo"
        height={height || width || "40px"}
        width={width || height || "40px"}
        objectFit="contain"
      />
    </>
  );
}

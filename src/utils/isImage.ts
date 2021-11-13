const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "svg",
  "webp",
  "tiff",
  "tif",
  "ico",
  "jfif",
  "jpe",
  "jfi",
  "jif",
  "jfif-tbnl",
  "jfif-tbnl",
  "jpe-tbnl",
  "jfi-tbnl",
  "jif-tbnl",
  "https://",
  "ipfs://",
];

export const isImage = (str: string): boolean => {
  if (typeof str !== "string") return false;

  return imageExtensions.some((ext) => str.includes(ext));
};

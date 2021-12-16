// all video extensions
const videoExtensions = [
  "webm",
  "mkv",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "mp4",
  "m4v",
  "avi",
  "mov",
  "wmv",
];

export const isVideo = (url?: string): string | boolean | undefined => {
  if (!url) return undefined;
  const extension = url.split(".").pop();
  return extension && videoExtensions.includes(extension)
    ? extension
    : undefined;
};

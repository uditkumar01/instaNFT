export const linkify = (text: string, target = "_blank"): string => {
  if (typeof text !== "string") return text;
  const urlRegex =
    // eslint-disable-next-line max-len
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="${target}" class="parsed-urls">${url}</a>`;
  });
};

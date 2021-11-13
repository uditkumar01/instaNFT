export const formatDate = (date: Date): string => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-US", options as any);

  return `${formattedDate} (IST)`;
};

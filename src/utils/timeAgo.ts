const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const nth = (d: number): string => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function timeAgo(date: string): string {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  const seconds = Math.abs(
    Math.floor((currentDate.getTime() - parsedDate.getTime()) / 1000)
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${parsedDate.getDate()}${nth(parsedDate.getDate())} ${
      monthNames[parsedDate.getMonth()]
    } ${parsedDate.getFullYear()}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${parsedDate.getDate()}${nth(parsedDate.getDate())} ${
      monthNames[parsedDate.getMonth()]
    }`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}d ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}h ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}m ago`;
  }
  const secondsAgo = `${Math.floor(seconds)}s ago`;
  return secondsAgo === "0s" ? "now" : secondsAgo;
}

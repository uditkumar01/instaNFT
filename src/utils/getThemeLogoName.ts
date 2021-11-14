export const getThemeLogoName = (color: string): string => {
  let colorName = color;
  switch (color) {
    case "red":
      colorName = "yellow";
      break;
    case "twitter":
      colorName = "blue";
      break;
    case "facebook":
      colorName = "blue";
      break;
    case "linkedin":
      colorName = "blue";
      break;
    case "gray":
      colorName = "blue";
      break;
    case "orange":
      colorName = "yellow";
      break;
    case "messenger":
      colorName = "blue";
      break;
    case "yellow":
      colorName = "yellow";
      break;
    case "green":
      colorName = "green";
      break;
    case "teal":
      colorName = "green";
      break;
    case "blue":
      colorName = "blue";
      break;
    case "purple":
      colorName = "purple";
      break;
    case "pink":
      colorName = "purple";
      break;
    case "whatsapp":
      colorName = "green";
      break;
    case "cyan":
      colorName = "blue";
      break;
    default:
      colorName = "blue";
      break;
  }
  return `/images/logo_${colorName}.png`;
};

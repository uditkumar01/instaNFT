import { errorHandler } from "../errorHandler";

export const setItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error: any) {
    errorHandler(error, "setItem.ts -> line: 7");
  }
};

import { errorHandler } from "../errorHandler";

export const getItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error: any) {
    errorHandler(error, "getItem.ts -> line 7");
    return null;
  }
};

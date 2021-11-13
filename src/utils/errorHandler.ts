export const errorHandler = (error: Error, path: string): void => {
  // eslint-disable-next-line no-console
  console.error(path, error);
};

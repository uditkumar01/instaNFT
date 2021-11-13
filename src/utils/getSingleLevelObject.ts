/* eslint-disable no-param-reassign */
export function getSingleLevelObject(
  obj: any
): Record<string, string | number> {
  if (!obj) return {};
  let isObject = true;
  while (isObject) {
    isObject = false;

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    Object.keys(obj || {}).forEach((key) => {
      if (obj?.[key] && typeof obj?.[key] === "object") {
        isObject = true;
        Object.keys(obj[key]).forEach((key2) => {
          if (obj?.[key]?.[key2]) {
            obj[key2] = obj?.[key]?.[key2] || "";
          }
        });
        delete obj[key];
      }
    });
  }
  return obj;
}

import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

export function getTNCData(fileName: string) {
  const fullPath = path.join(dataDir, `${fileName}.md`);
  const fileText = fs.readFileSync(fullPath, "utf8");

  return {
    content: fileText,
  };
}

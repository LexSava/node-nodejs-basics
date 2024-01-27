import { promises as fsPromises, constants } from "fs";

const read = async () => {
  const filePath = "src/fs/files/fileToRead.txt";

  try {
    await fsPromises.access(filePath, constants.R_OK);
    const content = await fsPromises.readFile(filePath, "utf-8");
    console.log("\x1b[32m%s\x1b[0m", "File content:");
    console.log(content);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: File not found or unable to read."
    );
  }
};

await read();

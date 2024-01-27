import { promises as fsPromises, constants } from "fs";

const remove = async () => {
  const filePath = "src/fs/files/fileToRemove.txt";

  try {
    await fsPromises.access(filePath, constants.F_OK);
    await fsPromises.unlink(filePath);
    console.log("\x1b[32m%s\x1b[0m", "File has been successfully deleted.");
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: File not found or unable to delete."
    );
  }
};

await remove();
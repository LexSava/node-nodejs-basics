import { promises as fsPromises, constants } from "fs";

const list = async () => {
  const folderPath = "src/fs/files";

  try {
    await fsPromises.access(folderPath, constants.R_OK);
    const files = await fsPromises.readdir(folderPath);
    console.log("\x1b[32m%s\x1b[0m", "File names in the folder:");
    console.log(files);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: Folder not found or unable to access."
    );
  }
};

await list();

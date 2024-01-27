import { promises as fsPromises, constants } from "fs";

const rename = async () => {
  const sourceFilePath = "src/fs/files/wrongFilename.txt";
  const destinationFilePath = "src/fs/files/properFilename.md";

  try {
    await fsPromises.access(destinationFilePath, constants.F_OK);
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: Destination file already exists"
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fsPromises.access(sourceFilePath, constants.R_OK);
      } catch (error) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          "FS operation failed: Source file not found"
        );
        return;
      }

      await fsPromises.rename(sourceFilePath, destinationFilePath);
      console.log("\x1b[32m%s\x1b[0m", "File has been successfully renamed.");
    } else {
      throw error;
    }
  }
};

await rename();

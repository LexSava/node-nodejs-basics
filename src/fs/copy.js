import { promises as fsPromises, constants } from "fs";

const copy = async () => {
  const sourceFolder = "src/fs/files";
  const destinationFolder = "src/fs/files_copy";

  try {
    await fsPromises.access(sourceFolder, constants.R_OK);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `FS operation failed: Source folder not found - ${error.message}`
    );
    return;
  }

  try {
    await fsPromises.access(destinationFolder, constants.R_OK);
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: Destination folder already exists"
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      await fsPromises.mkdir(destinationFolder);

      const files = await fsPromises.readdir(sourceFolder);

      for (const file of files) {
        const sourceFilePath = `${sourceFolder}/${file}`;
        const destinationFilePath = `${destinationFolder}/${file}`;

        const fileStat = await fsPromises.stat(sourceFilePath);

        if (fileStat.isDirectory()) {
          await copyDirectory(sourceFilePath, destinationFilePath);
        } else {
          await fsPromises.copyFile(sourceFilePath, destinationFilePath);
        }
      }

      console.log(
        "\x1b[32m%s\x1b[0m",
        `Folder '${sourceFolder}' has been successfully copied to '${destinationFolder}'.`
      );
    } else {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `FS operation failed: ${error.message}`
      );
    }
  }
};

const copyDirectory = async (source, destination) => {
  await fsPromises.mkdir(destination);
  const files = await fsPromises.readdir(source);

  for (const file of files) {
    const sourceFilePath = `${source}/${file}`;
    const destinationFilePath = `${destination}/${file}`;

    const fileStat = await fsPromises.stat(sourceFilePath);

    if (fileStat.isDirectory()) {
      await copyDirectory(sourceFilePath, destinationFilePath);
    } else {
      await fsPromises.copyFile(sourceFilePath, destinationFilePath);
    }
  }
};

await copy();

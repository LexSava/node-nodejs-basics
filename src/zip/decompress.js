import fs from "fs";
import zlib from "zlib";

const decompress = async () => {
  const sourceFilePath = "src/zip/files/archive.gz";
  const destinationFilePath = "src/zip/files/decompressed.txt";

  if (!fs.existsSync(sourceFilePath)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `Error: Source file ${sourceFilePath} not found.`
    );
    return;
  }

  if (fs.existsSync(destinationFilePath)) {
    if (fs.existsSync(destinationFilePath)) {
      console.error(
        "\x1b[33m%s\x1b[0m",
        `Warning: Destination file ${destinationFilePath} already exists. Overwriting...`
      );
    }
    return;
  }

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);
  const gunzipStream = zlib.createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `File decompressed successfully. Decompressed file created at: ${destinationFilePath}`
      );
      resolve();
    });

    gunzipStream.on("error", (error) => {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `Error decompressing file: ${error.message}`
      );
      reject(error);
    });
  });
};

await decompress();

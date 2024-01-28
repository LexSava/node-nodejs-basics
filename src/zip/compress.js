import fs from "fs";
import zlib from "zlib";

const compress = async () => {
  const sourceFilePath = "src/zip/files/fileToCompress.txt";
  const destinationFilePath = "src/zip/files/archive.gz";

  if (!fs.existsSync(sourceFilePath)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `Error: Source file ${sourceFilePath} not found.`
    );
    return;
  }

  if (fs.existsSync(destinationFilePath)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `Error: Destination file ${destinationFilePath} already exists.`
    );
    return;
  }

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);
  const gzipStream = zlib.createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `File compressed successfully. Archive created at: ${destinationFilePath}`
      );
      resolve();
    });

    gzipStream.on("error", (error) => {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `Error compressing file: ${error.message}`
      );
      reject(error);
    });
  });
};

await compress();

import { createReadStream } from "fs";

const read = async () => {
  const filePath = "src/streams/files/fileToRead.txt";

  console.log("\x1b[33m", `Reading content from file: ${filePath}`, "\x1b[0m");

  const readableStream = createReadStream(filePath);

  readableStream.on("data", (chunk) => {
    process.stdout.write(`\x1b[32m${chunk}\x1b[0m`);
  });

  readableStream.on("end", () => {
    console.log("\n\x1b[32m", "Reading completed.", "\x1b[0m");
  });

  readableStream.on("error", (error) => {
    console.error(
      "\x1b[31m",
      `Error reading file: ${error.message}`,
      "\x1b[0m"
    );
  });
};

await read();

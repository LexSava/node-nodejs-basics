import fs from "fs";

const write = async () => {
  const filePath = "src/streams/files/fileToWrite.txt";
  const writableStream = fs.createWriteStream(filePath);

  process.stdin.on("data", (chunk) => {
    writableStream.write(chunk);
  });

  process.stdin.on("end", () => {
    writableStream.end();
    console.log(
      "\x1b[32m",
      `Data has been successfully written to ${filePath}`,
      "\x1b[0m"
    );
  });

  console.log(
    "\x1b[36m",
    "Enter text to write to the file. Press Ctrl + D to finish.",
    "\x1b[0m"
  );
};

await write();

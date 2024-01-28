import { createReadStream } from "fs";
import { createHash } from "crypto";

const calculateHash = async () => {
  const filePath = "src/hash/files/fileToCalculateHashFor.txt";
  const hash = createHash("sha256");
  const fileStream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    fileStream
      .on("data", (chunk) => {
        hash.update(chunk);
      })
      .on("end", () => {
        const hashResult = hash.digest("hex");
        console.log("\x1b[32m", `SHA256 hash for ${filePath}: ${hashResult}`);
        resolve();
      })
      .on("error", (error) => {
        console.error("\x1b[31m", `Error reading file: ${error.message}`);
        reject(error);
      });
  });
};

await calculateHash();

import { access, writeFile } from "fs/promises";

const create = async () => {
  const filePath = "src/fs/files/fresh.txt";
  try {
    await access(filePath);
    throw new Error("FS operation failed: File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(filePath, "I am fresh and young");
      console.log("File fresh.txt has been created successfully.");
    } else {
      throw error;
    }
  }
};

await create();
import { access, writeFile } from "fs/promises";

const create = async () => {
  const filePath = "src/fs/files/fresh.txt";
  try {
    await access(filePath);
    console.error(
      "\x1b[31m%s\x1b[0m",
      "FS operation failed: File already exists"
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(filePath, "I am fresh and young");
      console.log(
        "\x1b[32m%s\x1b[0m",
        "File fresh.txt has been created successfully."
      );
    } else {
      throw error;
    }
  }
};

await create();

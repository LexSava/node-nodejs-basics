import { spawn } from "child_process";

const spawnChildProcess = async (args) => {
  const child = spawn("node", ["src/cp/files/script.js", ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.on("data", (chunk) => {
    child.stdin.write(chunk);
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  process.on("SIGINT", () => {
    child.stdin.write("CLOSE");
    child.stdin.end();
  });
};

spawnChildProcess(["Hello", "World"]);

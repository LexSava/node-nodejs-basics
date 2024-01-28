const parseArgs = () => {
  const args = process.argv.slice(2);
  console.log("\x1b[32m%s\x1b[0m", "Parsed command line arguments:");
  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace(/^--/, "");
    const value = args[i + 1];
    console.log("\x1b[32m%s\x1b[0m", `${propName} is ${value}`);
  }
};

parseArgs();

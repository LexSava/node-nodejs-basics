const parseEnv = () => {
  const envPrefix = "RSS_";
  const envVariables = process.env;
  console.log("\x1b[32m%s\x1b[0m", "Environment variables with prefix RSS_:");
  for (const key in envVariables) {
    if (key.startsWith(envPrefix)) {
      console.log("\x1b[32m%s\x1b[0m", `${key}=${envVariables[key]}`);
    }
  }
};

parseEnv();

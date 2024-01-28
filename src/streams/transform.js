import { Transform } from "stream";

const transform = async () => {
  const reverseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split("").reverse().join("");
      this.push(reversedText);
      callback();
    },
  });

  process.stdin.pipe(reverseTransformStream).pipe(process.stdout);
};

await transform();

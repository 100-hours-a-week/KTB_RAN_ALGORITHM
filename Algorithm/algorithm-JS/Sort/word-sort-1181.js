const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(words) {
  const uniqueWords = [...new Set(words)];

  uniqueWords.sort((a, b) => {
    if (a.length === b.length) return a.localeCompare(b);
    return a.length - b.length;
  });

  return uniqueWords;
}

const n = Number(input[0]);
const words = input.slice(1, n + 1);

console.log(solution(words).join("\n"));

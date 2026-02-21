const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(arr) {
  const arrSplit = [...arr];
  const stack = [];

  for (const e of arrSplit) {
    if (e === "(") {
      stack.push(e);
    }

    if (e === ")") {
      if (stack.length === 0) return "NO";
      stack.pop();
    }
  }

  return stack.length === 0 ? "YES" : "NO";
}

const n = Number(input[0]);
const answer = [];

for (let i = 1; i <= n; i++) {
  answer.push(solution(input[i]));
}

console.log(answer.join("\n"));

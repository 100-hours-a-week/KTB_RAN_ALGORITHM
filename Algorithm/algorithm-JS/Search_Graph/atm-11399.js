const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, arr) {
  arr.sort((a, b) => a - b);

  const prefix = Array.from({ length: n + 1 }, () => 0);
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
  }

  return prefix.reduce((acc, cur) => acc + cur, 0);
}

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

console.log(solution(n, arr));

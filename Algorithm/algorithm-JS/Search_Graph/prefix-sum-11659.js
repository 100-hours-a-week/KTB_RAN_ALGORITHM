const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, M, arr, points) {
  const answer = [];
  const prefix = Array.from({ length: N + 1 }, () => 0);

  for (let i = 1; i <= N; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
  }

  for (const [i, j] of points) {
    answer.push(prefix[j] - prefix[i - 1]);
  }

  return answer.join("\n");
}

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const points = input.slice(2, M + 2).map((line) => line.split(" ").map(Number));

console.log(solution(N, M, arr, points));

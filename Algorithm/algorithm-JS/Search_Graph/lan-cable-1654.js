const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(K, N, lines) {
  let left = 1;
  let right = Math.max(...lines);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let totalCount = 0;
    for (const line of lines) {
      totalCount += Math.floor(line / mid);
    }

    if (totalCount >= N) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

const [K, N] = input[0].split(" ").map(Number);
const lines = input.slice(1, K + 1).map(Number);

console.log(solution(K, N, lines));

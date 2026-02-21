const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, M, trees) {
  let left = 0;
  let right = Math.max(...trees);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let total = 0;
    for (const tree of trees) {
      const cut = tree - mid;
      if (cut > 0) total += cut;
    }

    if (total >= M) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

const [N, M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

console.log(solution(N, M, trees));

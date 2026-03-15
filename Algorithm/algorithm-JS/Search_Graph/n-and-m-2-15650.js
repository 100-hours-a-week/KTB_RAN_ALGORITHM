const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//N과 M(2)
//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const answer = [];
const current = [];
const [N, M] = input[0].split(" ").map(Number);

function dfs(start, depth) {
  if (depth === M) {
    answer.push(current.join(" "));
    return;
  }

  // 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
  // 고른 수열은 오름차순이어야 한다.
  for (let i = start; i <= N; i++) {
    current.push(i);
    dfs(i + 1, depth + 1);
    current.pop();
  }
}

function solution() {
  dfs(1, 0);
  return answer.join("\n");
}

console.log(solution());

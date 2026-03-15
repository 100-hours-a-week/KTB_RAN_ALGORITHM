const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//N과 M(1)
//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const answer = [];
const current = [];
const [N, M] = input[0].split(" ").map(Number);

function dfs(depth) {
  if (depth === M) {
    answer.push([...current]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (current.includes(i)) continue;

    current.push(i);
    dfs(depth + 1);
    current.pop();
  }
}

function solution() {
  dfs(0);
  return answer
    .map((i) => i.join(" "))
    .join("\n");
}

console.log(solution());

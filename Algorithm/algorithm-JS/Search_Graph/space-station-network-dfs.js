const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, stations) {
  const visited = new Set();
  let count = 0;

  function dfs(start) {
    visited.add(start);

    for (let next = 0; next < n; next++) {
      if (stations[start][next] === 1 && !visited.has(next)) {
        dfs(next);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      count += 1;
    }
  }

  return count;
}

const n = Number(input[0]);
const stations = input.slice(1, n + 1).map((line) => line.split(" ").map(Number));

console.log(solution(n, stations));

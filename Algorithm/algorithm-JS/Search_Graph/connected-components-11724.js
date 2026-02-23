const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function dfs(start, graph, visited) {
  visited.add(start);

  for (const child of graph[start]) {
    if (!visited.has(child)) dfs(child, graph, visited);
  }
}

function solution(N, M, edge) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const visited = new Set();

  for (const [u, v] of edge) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (!visited.has(i)) {
      count += 1;
      dfs(i, graph, visited);
    }
  }

  return count;
}

const [N, M] = input[0].split(" ").map(Number);
const edge = input.slice(1, M + 1).map((line) => line.split(" ").map(Number));

console.log(solution(N, M, edge));

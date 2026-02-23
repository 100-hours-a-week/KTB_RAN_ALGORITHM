const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function bfs(start, graph, visited) {
  const q = [start];
  let head = 0;
  let count = 0;

  visited.add(start);

  while (head < q.length) {
    const node = q[head++];

    for (const child of graph[node]) {
      if (!visited.has(child)) {
        visited.add(child);
        q.push(child);
        count += 1;
      }
    }
  }

  return count;
}

function solution(N, M, edge) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [u, v] of edge) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Set();
  return bfs(1, graph, visited);
}

const N = Number(input[0]);
const M = Number(input[1]);
const edge = input.slice(2, M + 2).map((line) => line.split(" ").map(Number));

console.log(solution(N, M, edge));

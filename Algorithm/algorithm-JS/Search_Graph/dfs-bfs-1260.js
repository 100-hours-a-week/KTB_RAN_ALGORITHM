const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function dfs(start, graph, visited, answer) {
  answer.push(start);
  visited.add(start);

  for (const child of graph[start]) {
    if (!visited.has(child)) {
      dfs(child, graph, visited, answer);
    }
  }
}

function bfs(start, graph, visited, answer) {
  const q = [start];
  let head = 0;

  visited.add(start);
  answer.push(start);

  while (head < q.length) {
    const node = q[head++];

    for (const child of graph[node]) {
      if (!visited.has(child)) {
        visited.add(child);
        q.push(child);
        answer.push(child);
      }
    }
  }
}

function solution(N, M, V, edge) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [u, v] of edge) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => a - b);
  }

  const dfsAnswer = [];
  const bfsAnswer = [];

  const visited = new Set();
  dfs(V, graph, visited, dfsAnswer);
  visited.clear();
  bfs(V, graph, visited, bfsAnswer);

  return `${dfsAnswer.join(" ")}\n${bfsAnswer.join(" ")}`;
}

const [N, M, V] = input[0].split(" ").map(Number);
const edge = input.slice(1, M + 1).map((line) => line.split(" ").map(Number));

console.log(solution(N, M, V, edge));

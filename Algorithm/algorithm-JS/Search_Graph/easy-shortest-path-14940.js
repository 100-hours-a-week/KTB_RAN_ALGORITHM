const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

//BFS로 하는게 나을듯

function bfs(queue, graph, dist, dx, dy, N, M, count) {
  while (queue.length) {
    let [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nextX = curX + dx[i];
      let nextY = curY + dy[i];

      if (
        nextX >= 0 &&
        nextX < N &&
        nextY >= 0 &&
        nextY < M &&
        graph[nextX][nextY] === 1
      ) {
        dist[nextX][nextY] = dist[curX][curY] + 1;
        graph[nextX][nextY] = 0;
        queue.push([nextX, nextY]);
      }
    }
  }
}

function solution(N, M, graph) {
  const dist = Array.from({ length: N }, () => Array(M).fill(0));
  let startX = 0;
  let startY = 0;
  //2찾기 : 시작점 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] == 2) {
        startX = i;
        startY = j;
      }
    }
  }

  //가야할 곳
  const queue = [];

  let count = 0;

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  queue.push([startX, startY]);
  bfs(queue, graph, dist, dx, dy, N, M, count);

  //못가는 곳 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] == 1) {
        graph[i][j] = 0;
        dist[i][j] = -1;
      }
    }
  }

  return dist.map((i) => i.join(" ")).join("\n");
}

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

console.log(solution(N, M, arr));

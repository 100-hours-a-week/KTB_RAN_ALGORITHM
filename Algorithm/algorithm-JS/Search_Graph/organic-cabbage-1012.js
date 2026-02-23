const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

//해당 문제는 뭉쳐있는 그룹 갯수 세는 거임.

function bfs(dx, dy, N, M, graph, queue) {
  while (queue.length) {
    //현재 있는 위치
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
        graph[nextX][nextY] = 0;
        queue.push([nextX, nextY]);
      }
    }
  }
}

function solution(N, M, K, arr) {
  const graph = Array.from({ length: N }, () => Array(M).fill(0));
  //인접 행렬로 만들기
  for (let [u, v] of arr) {
    graph[u][v] = 1;
  }

  let count = 0;
  let queue = [];

  let dx = [-1, 0, 1, 0];
  let dy = [0, 1, 0, -1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 1) {
        let start = [i, j];
        graph[i][j] = 0;
        queue.push(start);
        count++;
        bfs(dx, dy, N, M, graph, queue);
      }
    }
  }

  return count;
}

const forNum = Number(input[0]);
let idx = 1;

for (let i = 0; i < forNum; i++) {
  let [N, M, K] = input[idx++].split(" ").map(Number);
  let arr = [];

  for (let j = 0; j < K; j++) {
    arr.push(input[idx++].split(" ").map(Number));
  }

  console.log(solution(N, M, K, arr));
}

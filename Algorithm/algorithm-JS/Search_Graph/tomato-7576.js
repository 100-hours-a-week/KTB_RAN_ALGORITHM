//토마토
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

//상하 좌우 다 탐색 해야할 것같음.
//방문은 어떻게 처리하지?

function solution(N, M, graph) {
  let visited = Array.from({ length: M }, () => Array(N).fill(false));

  //1찾기
  const queue = [];
  queue.push([0, 0]);
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const searchQueue = [];
  let head = 0;

  while (head < queue.length) {
    let [curX, curY] = queue[head++];

    for (let i = 0; i < 4; i++) {
      let nextX = curX + dx[i];
      let nextY = curY + dy[i];

      if (
        nextX < M &&
        nextX >= 0 &&
        nextY < N &&
        nextY >= 0 &&
        visited[nextX][nextY] == false
      ) {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = true;
        if (graph[nextX][nextY] === 1) {
          searchQueue.push([nextX, nextY]);
        }
      }
    }
  }
  //   console.log(graph);
  //   console.log("searchQueue", searchQueue);

  //거리 기록
  let max = 0;
  head = 0;

  //1이 있는 자리부터 확인하기
  while (head < searchQueue.length) {
    let [curX, curY] = searchQueue[head++];

    for (let i = 0; i < 4; i++) {
      let nextX = curX + dx[i];
      let nextY = curY + dy[i];

      if (
        nextX < M &&
        nextX >= 0 &&
        nextY < N &&
        nextY >= 0 &&
        graph[nextX][nextY] == 0 //토마토가 존재함.
      ) {
        // console.log(nextX, nextY);
        searchQueue.push([nextX, nextY]); //추적함.
        visited[nextX][nextY] = true; //방문
        graph[nextX][nextY] = graph[curX][curY] + 1;
        // console.log(dist);
        max = graph[nextX][nextY];
      }
    }
  }
  //끝났을때 마지막 계산이
  //   console.log(graph);

  // 0 남았는지 검사
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 0) return -1;
    }
  }

  return max == 0 ? 0 : max - 1;
}

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

console.log(solution(N, M, arr));

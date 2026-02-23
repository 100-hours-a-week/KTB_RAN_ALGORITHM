const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, M, graph) {
  //거리 기록 용
  let d = Array.from({ length: N }, () => Array(M).fill(0));

  //탐사기록 큐 필요
  let queue = [];
  let head = 0;

  //시작지점
  let start = [0, 0];
  queue.push(start);

  //d(방문 거리용[미래])와 graph(지나쳐온 거리[과거])은 항상 같이 다닌다.
  d[0][0] = 1;
  graph[0][0] = 0; //방문한 곳은 0으로 변경

  const dX = [-1, 0, 1, 0];
  const dY = [0, 1, 0, -1];

  while (head < queue.length) {
    //현재 위치 X,Y : 큐에서 빼기 shift
    let [curX, curY] = queue[head++];

    //상하좌우 탐색 시전
    for (let i = 0; i < 4; i++) {
      let nextX = curX + dX[i];
      let nextY = curY + dY[i];

      if (
        nextX < N &&
        nextX >= 0 &&
        nextY < M &&
        nextY >= 0 &&
        graph[nextX][nextY] === 1
      ) {
        queue.push([nextX, nextY]);
        graph[nextX][nextY] = 0;
        d[nextX][nextY] = d[curX][curY] + 1;
      }
    }
  }

  return d[N - 1][M - 1] || -1;
}

const [N, M] = input[0].split(" ").map(Number);
const graph = input.slice(1).map((i) => [...i].map(Number));

console.log(solution(N, M, graph));

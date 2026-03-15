const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const t = Number(input[0]);
let line = 1;
const answer = [];

for (let tc = 0; tc < t; tc++) {
  const n = Number(input[line++]);
  const [startX, startY] = input[line++].split(" ").map(Number);
  const [endX, endY] = input[line++].split(" ").map(Number);

  answer.push(solution(n, startX, startY, endX, endY));
}

console.log(answer.join("\n"));

function solution(n, startX, startY, endX, endY) {
  if (startX === endX && startY === endY) return 0;

  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  const dist = Array.from({ length: n }, () => Array(n).fill(0));
  const queue = [];
  let head = 0;

  const dx = [-2, -2, -1, 1, 2, 2, -1, 1];
  const dy = [-1, 1, 2, 2, 1, -1, -2, -2];

  queue.push([startX, startY]);
  visited[startX][startY] = true;

  while (head < queue.length) {
    const [curX, curY] = queue[head++];

    for (let i = 0; i < 8; i++) {
      const nextX = curX + dx[i];
      const nextY = curY + dy[i];

      if (
        nextX >= 0 &&
        nextX < n &&
        nextY >= 0 &&
        nextY < n &&
        !visited[nextX][nextY]
      ) {
        visited[nextX][nextY] = true;
        dist[nextX][nextY] = dist[curX][curY] + 1;

        if (nextX === endX && nextY === endY) {
          return dist[nextX][nextY];
        }

        queue.push([nextX, nextY]);
      }
    }
  }

  return dist[endX][endY];
}

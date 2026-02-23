const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, K) {
  if (N === K) return 0;

  //2차원이 아니라 1차원 배열
  const visited = Array(100001).fill(false); //방문 노드 저장할 배열
  const dist = Array(100001).fill(0); //이동거리 저장할 곳

  //큐
  const queue = [N];
  visited[N] = true;

  while (queue.length) {
    //node는 이미 방문한 곳.
    //빼려는 이유: node의 인접한 친구를 확인하기 위해
    let node = queue.shift();

    for (let next of [node - 1, node + 1, node * 2]) {
      if (0 <= next && 100000 >= next && !visited[next]) {
        visited[next] = true;
        dist[next] = dist[node] + 1;

        if (K === next) return dist[next];

        queue.push(next);
      }
    }
  }

  return dist[K];
}

const [N, K] = input[0].split(" ").map(Number);

console.log(solution(N, K));

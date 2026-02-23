const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, K) {
  //BFS

  //visited
  //queue
  const visited = Array(100001).fill(false); //방문했는지 여부 배열
  const dist = Array(100001).fill(0); //이동 거리 수 저장
  const queue = []; //방문한 노드 배열
  const parent = Array(100001).fill(-1); //부모 경로 : 사용방법 parend[1] = 4 -> 1의 부모는 4 parent[4] = 5
  const move = [];
  //이동 경로를 저장해 두어야하나 각각?
  //퍼지다가 17을 만나서 멈춘건데 -> 역추적해야함.
  //역추적 해야하는 이유 : 1. BFS는 목표지에 도달하기 위해 퍼져나가는 용도 2. 역추적은 왔던길이
  //여기서 질문 역추적 한다고 한들 어떤 길이 정답 길인지 모르지 않나?
  //parent의 용도 : 처음 visited 되었을때의 길을 기억한다. <- 그 길이 곧 최단 거리이기 때문이다.

  //즉, 방문한 이동경로가 아니라 어디서 왔는지 부모 node를 기억하기
  //node(부모) -> next(자식) 을 갈때 visited가 방문하지 않았다면 처음 방문한다는 뜻! -> 최단 거리라는 뜻 : 핵심 포인트
  //때문에 이때 어디서 왔는지 기억하기 .
  //반복이 어려우면 반복할 조각단위로 보기

  queue.push(N);
  visited[N] = true;

  while (queue.length) {
    if (N === K) return "0\n" + N;
    let node = queue.shift();

    if (node === K) break;

    for (let next of [node - 1, node + 1, node * 2]) {
      if (0 <= next && next <= 100000 && !visited[next]) {
        queue.push(next);

        visited[next] = true; //next 개척했구나!
        parent[next] = node; //next의 부모 기억해두기

        dist[next] = dist[node] + 1; //ex ) node = 5 : next = 4 => dist[4] = dist[5](v:0)+1 = 1 이런식으로 돈다는 뜻임. dist[6] = 1 , dist[10] = 1
        if (next === K) {
          let child = next;
          let parentNode = K;
          move.push(parentNode);
          while (child !== N) {
            //parent의 부모의 부모의 부모 찾기 parent[4] = 1 -> parent[1]
            parentNode = parent[child];
            move.push(parentNode);
            child = parentNode;
          }
          return dist[next] + "\n" + move.reverse().join(" ");
        }
      }
    }
  }
}

const [N, K] = input[0].split(" ").map(Number);

console.log(solution(N, K));

function solution(n, roads, start) {
  //인접리스트 방식으로 : 인접 리스트
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of roads) {
    graph[u].push(v);
    graph[v].push(u);
  } //양방향 (무방향);

  const visited = Array(n + 1).fill(false); //방문
  const d = Array(n + 1).fill(0); //이동거리

  //bfs 탐색 시작
  const queue = [start];
  visited[start] = true;

  while (queue.length) {
    let node = queue.shift();
    for (let next of graph[node]) {
      if (!visited[next]) {
        visited[next] = true;
        d[next] = d[node] + 1;
        queue.push(next);
      }
    }
  }

  //거리 배열중 가장 큰 값
  return Math.max(...d);
}

console.log(
  solution(
    6,
    [
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [5, 6],
      [4, 6],
    ],
    1
  )
);
console.log(
  solution(
    4,
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 2],
    ],
    1
  )
);

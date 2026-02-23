## 🧩 문제

* **문제 제목** : DFS와 BFS
* **문제 레벨** : Silver II
* **문제 유형** : 그래프 탐색, DFS, BFS
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/1260
* **코드 파일** : [dfs-bfs-1260.js](../../algorithm-JS/Search_Graph/dfs-bfs-1260.js)

---

## 🧩 문제 설명

무방향 그래프와 시작 정점 `V`가 주어진다.  
`V`에서 시작한 DFS 방문 순서와 BFS 방문 순서를 각각 출력한다.  
여러 정점을 방문할 수 있을 때는 **정점 번호가 작은 것부터** 방문해야 한다.

---

## 🧩 문제 핵심 포인트

* 같은 그래프라도 DFS와 BFS의 방문 순서는 다르다.
* DFS는 "깊게" 먼저 들어가고, BFS는 "가까운 레벨"부터 넓게 퍼진다.
* 문제 조건(작은 번호 먼저 방문)을 만족하려면 인접 리스트를 정렬해야 한다.
* 이 문제는 BFS/DFS 차이를 가장 직관적으로 보여주는 대표 문제다.

---

## 🧩 내 풀이 방식

* 간선 목록을 인접 리스트로 만든 뒤 각 리스트를 오름차순 정렬했다.
* DFS는 재귀로 구현하고, 방문 즉시 `answer`에 기록했다.
* BFS는 큐로 구현해서 선입선출 순서대로 탐색했다.
* 방문 집합은 DFS 후 `clear()` 해서 BFS에서 다시 사용했다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. graph 인접 리스트 생성 (양방향)
2. graph[i] 오름차순 정렬
3. dfs(V) 수행 후 순서 저장
4. visited 초기화
5. bfs(V) 수행 후 순서 저장
6. DFS 결과, BFS 결과 출력
```

### 왜 순서가 달라지는가

| 구분 | 자료구조 | 탐색 성격 | 결과 느낌 |
| --- | --- | --- | --- |
| DFS | 재귀(스택) | 한 갈래를 끝까지 깊게 | 길게 파고드는 순서 |
| BFS | 큐 | 시작점 주변부터 레벨 단위 | 가까운 노드 우선 순서 |

---

## 🧩 코드 구현 (내 풀이)

```js
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
```

---

## 🧩 사용된 JS 개념

* `Array.from` : 인접 리스트 초기화
* `sort((a, b) => a - b)` : 작은 번호 우선 방문 조건 충족
* 재귀 + 큐(배열 + head 포인터) : DFS/BFS 각각 구현
* `Set` : 방문 노드 관리

---

## 🧩 복잡도

* 시간복잡도 : `O((N + M) + M log M)` (인접 리스트 정렬 포함)
* 공간복잡도 : `O(N + M)` (그래프 + 방문 배열/집합)

---

## 🧠 사고 키워드

* 그래프 순회
* 깊이 우선 vs 너비 우선
* 방문 순서 제어

---

## 🔍 트리거 문장

* "DFS 결과와 BFS 결과를 모두 출력"
* "정점 번호가 작은 것부터 방문"
* "무방향 그래프"

---

## ⚠️ 오답 포인트

* 인접 리스트 정렬을 빼먹으면 방문 순서가 달라져 오답이 된다.
* DFS와 BFS에서 방문 집합을 분리/초기화하지 않으면 BFS 결과가 비정상이다.
* BFS에서 `shift()`를 대량 사용하면 입력이 커질 때 비효율적일 수 있다.

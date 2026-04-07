## 🧩 문제

- **문제 제목** : 최소비용 구하기
- **문제 레벨** : Gold 5
- **문제 유형** : 다익스트라, 우선순위 큐(힙), 단일 출발-도착 최단거리
- **문제 제공** : BOJ 1916
- **문제 링크** : https://www.acmicpc.net/problem/1916
- **코드 파일 (Python)** : [minimum-cost-1916.py](../../algorithm-Python/Search_Graph/minimum-cost-1916.py)

---

## 🧩 문제 설명

도시 개수 `N`, 버스 노선 `M`이 주어지고 각 버스의 출발 도시, 도착 도시, 비용이 주어진다.  
시작 도시에서 도착 도시까지 가는 최소 비용을 구해 출력하는 문제다.

---

## 🧩 문제 핵심 포인트

- 간선 비용이 모두 양수이므로 다익스트라를 적용할 수 있다.
- 이 문제는 "모든 정점"이 아니라 특정 `start -> end` 최소비용만 필요하다.
- 힙에서 꺼낸 상태가 최신 최단거리 상태인지 `dist[curNode] < curDist`로 판별해 불필요한 확장을 줄여야 한다.

---

## 🧩 내 풀이 방식

- 인접 리스트 `graph[u]`에 `(비용, 다음도시)` 형태로 간선을 저장했다.
- `dist`를 무한대로 초기화하고 시작점만 `0`으로 설정했다.
- 최소 힙에서 가장 작은 누적 비용 상태를 계속 꺼내며 인접 간선을 완화했다.
- 탐색 종료 후 `dist[end]`를 반환해 정답으로 출력했다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 정점 수 V, 간선 수 M을 입력받는다.
2. M개의 버스 정보를 인접 리스트 그래프로 구성한다.
3. 시작점/도착점을 입력받는다.
4. dist 배열을 inf로 초기화하고 시작점은 0으로 둔다.
5. 힙에서 (현재거리, 현재정점)을 꺼낸다.
6. 이미 더 짧은 거리로 방문한 정점이면 스킵한다.
7. 인접 정점에 대해 더 짧은 경로면 dist 갱신 후 힙에 삽입한다.
8. dist[end]를 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```python
import heapq
import sys

sys.stdin = open("../예제.txt")

input = sys.stdin.readline
V = int(input());
M = int(input());

arr = [list(map(int, input().split(" "))) for _ in range(M)]
graph = [[] for _ in range(V+1)]

start, end = map(int,input().split(" "))


for u,v,w in arr:
    graph[u].append((w,v));
    

def dijkstra ():
    heap = [];
    dist = [float('inf')]*(V+1);
    heapq.heappush(heap, (0, start))
    dist[start] = 0
    
    while heap :
        curDist,curNode = heapq.heappop(heap);
        
        if dist[curNode] < curDist : continue;
        
        for cost,nextNode in graph[curNode]:
            if dist[nextNode] > curDist + cost:
                dist[nextNode] = cost + curDist
                heapq.heappush(heap,(cost + curDist,nextNode))

    return dist[end]


print(dijkstra())
```

---

## 🧩 사용된 Python 개념

- `heapq` : 현재까지 가장 비용이 낮은 경로 상태를 우선 탐색
- `float('inf')` : 아직 도달하지 못한 정점의 초기 거리 표현
- 인접 리스트(`list` 안에 `tuple`) : 희소 그래프를 효율적으로 저장
- `sys.stdin.readline` : 입력이 많은 그래프 문제에서 빠른 입력 처리

---

## 🧩 복잡도

- 시간복잡도 : `O((V + M) log V)`
- 공간복잡도 : `O(V + M)`

---

## 🧠 사고 키워드

- 단일 출발점 최단거리
- 양수 가중치 그래프
- 힙 기반 그리디 확장
- 완화(relaxation) 반복

---

## 🔍 트리거 문장

- "시작 도시에서 도착 도시까지의 최소 비용"
- "버스 비용이 주어진 방향 그래프"
- "최소 비용 경로"

---

## ⚠️ 오답 포인트

- 간선을 `(다음정점, 비용)` 순서로 저장해 두고 `(cost, nextNode)`처럼 읽으면 값이 뒤바뀌어 오답이 난다.
- 힙에서 뽑은 상태가 구버전 거리인지 확인하지 않으면 불필요한 연산이 누적될 수 있다.
- 정답은 `dist[end]` 하나인데 모든 정점 출력을 하도록 짜면 문제 요구와 달라진다.

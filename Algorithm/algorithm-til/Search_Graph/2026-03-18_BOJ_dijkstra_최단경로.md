## 🧩 문제

- **문제 제목** : 최단경로
- **문제 레벨** : Gold 4
- **문제 유형** : 다익스트라, 우선순위 큐(힙), 방향 그래프
- **문제 제공** : BOJ 1753
- **문제 링크** : https://www.acmicpc.net/problem/1753
- **코드 파일 (Python)** : [shortest-path-1753.py](../../algorithm-Python/Search_Graph/shortest-path-1753.py)

---

## 🧩 문제 설명

방향 그래프가 주어지고 시작 정점 `K`가 주어진다.  
시작 정점에서 모든 정점까지의 최단 거리를 구해 출력해야 하며, 도달할 수 없는 정점은 `INF`를 출력한다.

---

## 🧩 문제 핵심 포인트

- 간선 가중치가 양수이므로 다익스트라 알고리즘을 사용할 수 있다.
- "현재까지 가장 짧은 거리"를 빠르게 꺼내기 위해 최소 힙(`heapq`)이 핵심이다.
- 힙에서 꺼낸 거리보다 이미 더 짧은 거리가 `dist`에 있으면 해당 상태는 폐기해야 한다.

---

## 🧩 내 풀이 방식

- 입력 간선을 인접 리스트 `graph[u] = [(w, v), ...]` 형태로 저장했다.
- `dist`를 무한대로 초기화하고 시작점만 `0`으로 두었다.
- 힙에서 `(거리, 정점)`을 꺼내 인접 정점에 대해 완화(relaxation)를 수행했다.
- 모든 탐색이 끝난 뒤 `dist[1:]`를 순회하며 무한대는 `INF`, 아니면 숫자를 문자열로 출력했다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. V, E, 시작 정점을 입력받는다.
2. 간선 정보를 인접 리스트로 구성한다.
3. dist 배열을 INF로 초기화하고 시작 정점 거리를 0으로 둔다.
4. 최소 힙에 (0, 시작 정점)을 넣는다.
5. 힙에서 가장 짧은 거리 상태를 꺼낸다.
6. 현재 거리보다 더 짧은 값이 이미 dist에 있으면 스킵한다.
7. 인접 간선을 순회하며 더 짧은 경로를 찾으면 dist 갱신 + 힙 삽입한다.
8. dist를 문제 출력 형식(INF 또는 거리)으로 변환해 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```python
import heapq, sys

sys.stdin = open("../예제.txt")

input = sys.stdin.readline

V,E = map(int,input().split(" "))

start = int(input());

arr = [list(map(int,input().split(" "))) for _ in range(E)]
graph = [[] for _ in range(V+1)];

for u, v, w in arr:
    graph[u].append((w,v))

# print(graph)


def dijkstra():
    #dist
    #heapq
    #visited
    #방향벡터
    
    dist = [float('INF')]*(V+1); #i까지의 거리  
    dist[start] = 0
    
    heap = []; #“이미 계산된 거리들 중에서 가장 짧은 것”을 뽑는 역할
    heapq.heappush(heap, (0,start)); #0은 지금까지 쌓아온 dist라는 뜻. 
    
    while heap:
        curDist,curNode = heapq.heappop(heap);
        
        if dist[curNode] < curDist : continue
        
        for cost,nextNode in graph[curNode] : #나(curNode)를 알게 되었기 때문에, 그의 친구들을 graph에 넣어뒀으니 빼보면서 확인한 것들을 
            if dist[nextNode] > curDist + cost :
                
                dist[nextNode] = curDist + cost
                heapq.heappush(heap, (curDist + cost,nextNode)) #heap에 넣는다.


    
    return "\n".join("INF" if d == float('inf') else str(d) for d in dist[1:])


print(dijkstra())
```

---

## 🧩 사용된 Python 개념

- `heapq.heappush / heapq.heappop` : 최소 거리 상태를 우선 처리
- `float('INF')` : 거리 배열의 초기 무한대 값 표현
- 인접 리스트(`list` of `tuple`) : 그래프를 `O(V+E)` 공간으로 저장
- `"\n".join(...)` : 정점별 결과를 줄바꿈 출력 형식으로 변환

---

## 🧩 복잡도

- 시간복잡도 : `O((V + E) log V)`
- 공간복잡도 : `O(V + E)` (`graph`, `dist`, `heap`)

---

## 🧠 사고 키워드

- 단일 시작점 최단거리
- 가중치가 있는 그래프 + 양수 간선
- 완화(relaxation) 반복
- 힙 기반 그리디 확장

---

## 🔍 트리거 문장

- "한 시작점에서 모든 정점까지 최단 거리"
- "도달할 수 없는 정점은 INF 출력"
- "간선에 가중치가 존재"

---

## ⚠️ 오답 포인트

- 힙에서 꺼낸 상태를 `if dist[curNode] < curDist`로 걸러내지 않으면 중복 상태로 시간 초과가 날 수 있다.
- 인접 리스트에 `(정점, 가중치)`와 `(가중치, 정점)` 순서를 섞어 쓰면 완화식이 틀어진다.
- 도달 불가능 정점을 숫자로 출력하면 오답이며 반드시 `INF` 문자열로 출력해야 한다.

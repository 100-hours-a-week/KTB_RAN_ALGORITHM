## 🧩 문제

- **문제 제목** : 선분 위의 점
- **문제 레벨** : Silver 3
- **문제 유형** : 이분 탐색, 정렬, lower/upper bound
- **문제 제공** : BOJ
- **문제 링크** : https://www.acmicpc.net/problem/11663
- **코드 파일 (Python)** : [points-on-line-11663.py](../../algorithm-Python/Search_Graph/points-on-line-11663.py)

---

## 🧩 문제 설명

수직선 위에 `N`개의 점이 있고, `M`개의 선분 `[x, y]`가 주어진다.  
각 선분 안에 포함되는 점의 개수를 구해 줄바꿈으로 출력하는 문제다.

---

## 🧩 문제 핵심 포인트

- 선분마다 전체 점을 순회하면 `O(N*M)`이 되어 시간 초과 위험이 크다.
- 점 배열을 정렬해 두면 구간 `[x, y]` 안의 개수를 인덱스 차이로 계산할 수 있다.
- `bisect_left(points, x)`와 `bisect_right(points, y)`의 차이가 정답이다.

---

## 🧩 내 풀이 방식

- 점 배열 `points`를 오름차순 정렬한다.
- 각 선분 `[start, end]`마다:
- `left_index = bisect_left(points, start)`
- `right_index = bisect_right(points, end)`
- `right_index - left_index`를 결과 배열에 넣는다.
- 결과를 줄바꿈으로 출력한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 점 배열을 정렬한다.
2. 선분 하나를 읽는다.
3. start의 lower bound 인덱스를 찾는다.
4. end의 upper bound 인덱스를 찾는다.
5. 두 인덱스 차이를 답으로 저장한다.
6. 모든 선분에 대해 반복 후 줄바꿈 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```python
import sys
import bisect
sys.stdin = open("../예제.txt")
input = sys.stdin.readline

[n,m] = list(map(int,input().split(" ")));
arrN = list(map(int, input().split(" ")))
arrN.sort();
answer = [];

for _ in range(m) :
    x, y = map(int, input().split(" "));

    count = bisect.bisect_right(arrN,y)-bisect.bisect_left(arrN,x)
    answer.append(count)

print("\n".join(map(str,answer)))
```

---

## 🧩 사용된 Python 개념

- `list.sort()` : 점 배열 오름차순 정렬
- `bisect.bisect_left()` : 시작점 이상이 처음 나오는 위치
- `bisect.bisect_right()` : 끝점 초과가 처음 나오는 위치
- `"\n".join(map(str,answer))` : 줄바꿈 출력 포맷

---

## 🧩 복잡도

- 시간복잡도 : `O(NlogN + MlogN)`
- 공간복잡도 : `O(M)` (`answer` 저장)

---

## 🧠 사고 키워드

- 정렬 후 다중 구간 질의
- 경계 인덱스 차이
- lower/upper bound 패턴

---

## 🔍 트리거 문장

- "선분마다 포함되는 점의 개수"
- "여러 구간 질의"
- "점들은 고정, 질의만 여러 번 들어온다"

---

## ⚠️ 오답 포인트

- `bisect_left`/`bisect_right`를 바꿔 쓰면 개수가 틀어진다.
- 정렬 없이 bisect를 쓰면 인덱스 의미가 깨진다.
- 출력 형식을 공백으로 하면 오답(줄바꿈 출력 필요) 처리될 수 있다.

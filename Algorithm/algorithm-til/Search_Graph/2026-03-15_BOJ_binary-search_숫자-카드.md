## 🧩 문제

- **문제 제목** : 숫자 카드
- **문제 레벨** : Silver V
- **문제 유형** : 이분 탐색, 정렬
- **문제 제공** : BOJ
- **문제 링크** : https://www.acmicpc.net/problem/10815
- **코드 파일 (Python)** : [number-card-10815.py](../../algorithm-Python/Search_Graph/number-card-10815.py)
- **코드 파일 (JavaScript)** : [number-card-10815.js](../../algorithm-JS/Search_Graph/number-card-10815.js)

---

## 🧩 문제 설명

상근이가 가진 카드 배열 `cards`와 질의 배열 `queries`가 주어진다.  
각 질의 값이 카드 배열에 존재하면 `1`, 없으면 `0`을 순서대로 출력하는 문제다.

---

## 🧩 문제 핵심 포인트

- `N`, `M`이 커서 질의마다 선형 탐색하면 시간 초과 위험이 크다.
- 카드 배열을 정렬한 뒤 질의마다 이분 탐색하면 빠르게 존재 여부를 판별할 수 있다.
- 출력은 질의 순서를 유지한 채 `0/1` 결과를 공백으로 이어서 출력하면 된다.
- Python에서는 `bisect` 모듈이나 `set`을 이용해 같은 문제를 더 간결하게 구현할 수도 있다.

---

## 🧩 내 풀이 방식

- `cards`를 오름차순 정렬한다.
- 각 `query`마다 `left`, `right`를 두고 이분 탐색을 수행한다.
- 찾으면 `1`, 끝까지 못 찾으면 `0`을 `answer`에 넣는다.
- 출력은 Python에서는 `print(*answer)`, JS에서는 `answer.join(" ")`를 사용한다.
- Python 응용으로는 `bisect_left` 위치 확인 방식, `set` 포함 여부 체크 방식도 가능하다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. cards 배열을 정렬한다.
2. queries를 순회한다.
3. 각 query마다 이분 탐색으로 존재 여부를 확인한다.
4. 존재하면 1, 없으면 0을 결과 배열에 저장한다.
5. 결과 배열을 공백으로 연결해 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

### Python

```python
import sys

# sys.stdin = open("../예제.txt")
input = sys.stdin.readline


def solution(cards, target):
    left = 0
    right = len(cards) - 1

    while left <= right:
        mid = (left + right) // 2

        if cards[mid] == target:
            return 1
        if cards[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return 0


n = int(input())
cards = list(map(int, input().split()))

m = int(input())
queries = list(map(int, input().split()))

cards.sort()

answer = []
for query in queries:
    answer.append(solution(cards, query))

print(*answer)
```

---

### Python (bisect)

```python
def exist(target) :
    idx = bisect.bisect_left(arr, target)
    return 1 if idx<len(arr) and arr[idx] == target else 0


for target in arrM :
    answer.append(exist(target))

print(*answer)
```

---

### Python (set)

```python
import sys

input = sys.stdin.readline

n = int(input())
cards = list(map(int, input().split()))

m = int(input())
queries = list(map(int, input().split()))

card_set = set(cards)
answer = [1 if target in card_set else 0 for target in queries]

print(*answer)
```

---

### JavaScript

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

// 백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function binarySearch(cards, target) {
  let left = 0;
  let right = cards.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (cards[mid] === target) return 1;
    if (cards[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return 0;
}

function solution(n, cards, m, queries) {
  cards.sort((a, b) => a - b);

  const answer = [];
  for (const query of queries) {
    answer.push(binarySearch(cards, query));
  }

  return answer.join(" ");
}

const n = Number(input[0]);
const cards = input[1].split(" ").map(Number);

const m = Number(input[2]);
const queries = input[3].split(" ").map(Number);

console.log(solution(n, cards, m, queries));
```

---

## 🧩 사용된 언어별 개념

- Python `list.sort()` : 숫자 오름차순 정렬
- Python `//` : 중간 인덱스 정수 나눗셈
- Python `print(*answer)` : 공백 구분 출력
- Python `bisect_left` : 정렬 배열에서 target의 삽입 가능 시작 인덱스 탐색
- Python `set` : 해시 기반 평균 `O(1)` 포함 여부 조회
- JavaScript `sort((a, b) => a - b)` : 숫자 오름차순 정렬
- JavaScript `Math.floor((left + right) / 2)` : 중간 인덱스 계산
- JavaScript `answer.join(" ")` : 공백 구분 출력

---

## 🧩 복잡도

- 직접 이분탐색 : 시간 `O(NlogN + MlogN)`, 공간 `O(M)`
- `bisect` : 시간 `O(NlogN + MlogN)`, 공간 `O(M)`
- `set` : 시간 `O(N + M)` (평균), 공간 `O(N + M)`

---

## 🧠 사고 키워드

- 정렬 후 다중 질의
- 존재 여부 판별
- 이분 탐색 루프 패턴

---

## 🔍 트리거 문장

- "입력 크기가 커서 단순 탐색은 위험하다."
- "찾으면 1, 없으면 0을 순서대로 출력한다."
- "여러 질의를 빠르게 처리해야 한다."

---

## ⚠️ 오답 포인트

- 정렬하지 않고 이분 탐색하면 결과가 보장되지 않는다.
- 입력 파싱에서 `split(" ")`에 집착하면 공백/개행 처리 실수가 생길 수 있다.
- 질의 결과를 매번 `print`하면 느려질 수 있어 한 번에 출력하는 습관이 안전하다.
- `set` 방식은 존재 여부 문제에서 강력하지만, 정렬된 위치/개수(lower-upper)까지 필요하면 `bisect`가 더 적합하다.

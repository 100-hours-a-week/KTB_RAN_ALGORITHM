## 🧩 문제

* **문제 제목** : N과 M (4)
* **문제 레벨** : 실버 3
* **문제 유형** : 백트래킹, DFS
* **문제 제공** : BOJ 15652
* **문제 링크** : https://www.acmicpc.net/problem/15652
* **코드 파일** : [n-and-m-4-15652.js](../../algorithm-JS/Search_Graph/n-and-m-4-15652.js)

---

## 🧩 문제 설명

`1..N`에서 길이 `M` 수열을 만든다.  
같은 수를 여러 번 골라도 되지만, 수열은 오름차순(비내림차순)이어야 한다.

---

## 🧩 문제 핵심 포인트

* `N과 M(1)`과 다르게 **중복 선택 가능**이다.
* 대신 **감소하는 선택은 불가능**하다.
* 그래서 `current[depth - 1] > i`인 경우를 건너뛰면 조건을 만족할 수 있다.

---

## 🧩 내 풀이 방식

* `current`에 현재까지 고른 수열을 저장한다.
* `depth === M`이면 완성된 수열이라 `answer`에 넣는다.
* 매 단계에서 `1..N`을 돌되, 직전 값보다 작은 수는 건너뛴다.
* `push -> dfs -> pop` 백트래킹으로 모든 합법 수열을 탐색한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, M 입력
2. dfs(0) 시작
3. depth === M 이면 current 저장
4. i=1..N 순회
   - current[depth-1] > i 면 skip
   - push(i) -> dfs(depth+1) -> pop()
5. answer 출력
```

### 재귀 호출 트리 구조 (N=3, M=2)

```txt
dfs(0), current=[]
│
├─ i=1 선택 -> [1] -> dfs(1)
│   ├─ i=1 가능 -> [1,1] -> dfs(2) ✅ 출력
│   ├─ i=2 가능 -> [1,2] -> dfs(2) ✅ 출력
│   └─ i=3 가능 -> [1,3] -> dfs(2) ✅ 출력
│
├─ i=2 선택 -> [2] -> dfs(1)
│   ├─ i=1 불가 (직전 2 > 1)
│   ├─ i=2 가능 -> [2,2] -> dfs(2) ✅ 출력
│   └─ i=3 가능 -> [2,3] -> dfs(2) ✅ 출력
│
└─ i=3 선택 -> [3] -> dfs(1)
    ├─ i=1 불가 (3 > 1)
    ├─ i=2 불가 (3 > 2)
    └─ i=3 가능 -> [3,3] -> dfs(2) ✅ 출력
```

핵심은 매 depth에서 직전 값보다 작은 후보를 잘라내면서,
트리가 자동으로 비내림차순 수열만 탐색하게 만드는 것이다.

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//N과 M(4)
//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const current = [];
const answer = [];

function dfs(depth) {
  if (depth === M) {
    answer.push([...current]);
    return;
    // 여기서 멈춰야 됨 (트리거)
  }

  for (let i = 1; i <= N; i++) {
    // 오름차순(비내림차순) 유지: 직전 값보다 작은 값은 스킵
    if (current[depth - 1] > i) continue;

    current.push(i);
    dfs(depth + 1);
    current.pop();
  }

  return answer;
}

function solution() {
  return dfs(0)
    .map((i) => i.join(" "))
    .join("\n");
}

console.log(solution());
```

---

## 🧩 사용된 JS 개념

* 재귀 함수 : DFS/백트래킹
* 배열 `push`, `pop` : 상태 변경/복구
* 전개 연산자 `[...current]` : 결과 저장 시 참조 분리
* `map + join` : 출력 포맷 생성

---

## 🧩 복잡도

* 시간복잡도 : 최악 `O(N^M * M)`
* 공간복잡도 : `O(M)` (재귀 깊이 + current, 결과 제외)

---

## 🧠 사고 키워드

* 백트래킹
* 비내림차순 제약
* 가지치기(pruning)
* 선택-탐색-복구

---

## 🔍 트리거 문장

* "같은 수를 여러 번 골라도 된다"
* "오름차순"
* "모든 수열 출력"

---

## ⚠️ 오답 포인트

* `current[depth - 1] > i` 가지치기를 빼면 감소 수열이 섞여 오답이 된다.
* `answer.push(current)`로 저장하면 참조 공유로 결과가 깨진다.
* `pop()` 누락 시 다음 분기에 이전 선택이 남아 오답이 된다.

---

## 📝 회고 KPT

### 🟢 Keep

* 조건을 후처리하지 않고 탐색 단계에서 바로 가지치기해서 문제 제약을 반영했다.
* 백트래킹의 기본 구조(`push -> dfs -> pop`)를 안정적으로 유지했다.

### 🔴 Problem

* 처음엔 N과 M(1)처럼 중복 금지 조건을 넣으려는 습관 때문에 문제 조건을 혼동할 수 있다.
* 오름차순과 중복 허용을 동시에 만족시키는 조건을 코드 초반에 명확히 정리하지 않으면 헷갈린다.

### 🟡 Try

* 다음부터 N과 M 시리즈는 먼저 "중복 허용/금지"와 "순서 조건"을 표로 분리해서 시작한다.
* 제약은 결과 필터링이 아니라 DFS 내부 가지치기로 처리하는 습관을 유지한다.

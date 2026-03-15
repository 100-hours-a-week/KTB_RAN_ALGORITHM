## 🧩 문제

* **문제 제목** : N과 M (2)
* **문제 레벨** : 실버 3
* **문제 유형** : 백트래킹, DFS, 조합
* **문제 제공** : BOJ 15650
* **문제 링크** : https://www.acmicpc.net/problem/15650
* **코드 파일** : [n-and-m-2-15650.js](../../algorithm-JS/Search_Graph/n-and-m-2-15650.js)

---

## 🧩 문제 설명

자연수 `1..N`에서 중복 없이 `M`개를 고른 수열을 출력한다.  
단, 수열은 반드시 오름차순이어야 한다.

---

## 🧩 문제 핵심 포인트

* N과 M (1)과 달리 순열이 아니라 조합이다.
* 오름차순 조건을 만족하려면 "이전에 고른 수보다 큰 수만" 다음에 고르면 된다.
* `start` 인자를 두고 `dfs(start, depth)`로 탐색하면 중복/역순 수열이 자동으로 제거된다.

---

## 🧩 내 풀이 방식

* `current` 배열에 현재 조합을 저장한다.
* `depth === M`이면 `current`를 문자열로 만들어 정답 배열에 넣는다.
* `for (i = start; i <= N; i++)`로 현재 단계에서 선택 가능한 수만 순회한다.
* 하나 선택한 뒤 다음 단계는 `dfs(i + 1, depth + 1)`로 진행해 오름차순을 강제한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, M 입력
2. dfs(1, 0) 시작
3. depth === M 이면 current를 정답에 저장
4. i = start..N 순회
   - current.push(i)
   - dfs(i + 1, depth + 1)
   - current.pop()
5. 정답 배열을 줄바꿈으로 출력
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//N과 M(2)
//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const answer = [];
const current = [];
const [N, M] = input[0].split(" ").map(Number);

function dfs(start, depth) {
  if (depth === M) {
    answer.push(current.join(" "));
    return;
  }

  // 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
  // 고른 수열은 오름차순이어야 한다.
  for (let i = start; i <= N; i++) {
    current.push(i);
    dfs(i + 1, depth + 1);
    current.pop();
  }
}

function solution() {
  dfs(1, 0);
  return answer.join("\n");
}

console.log(solution());
```

---

## 🧩 사용된 JS 개념

* 재귀 함수 : DFS 탐색
* 배열 `push/pop` : 선택/복구(백트래킹)
* `join("\n")` : 출력 포맷 맞추기
* 매개변수 `start` : 조합 조건(오름차순) 제어

---

## 🧩 복잡도

* 시간복잡도 : `O(C(N, M) * M)`
* 공간복잡도 : `O(M)` (재귀 깊이 + current, 결과 제외)

---

## 🧠 사고 키워드

* 백트래킹
* 조합 생성
* 시작 인덱스 제어
* 선택-탐색-복구

---

## 🔍 트리거 문장

* "중복 없이"
* "오름차순"
* "1부터 N까지에서 M개"

---

## ⚠️ 오답 포인트

* N과 M (1)처럼 매 단계 `1..N` 전체를 돌면 중복 조합/역순 조합이 나온다.
* `dfs(i + 1, ...)`가 아니라 `dfs(i, ...)`로 호출하면 같은 숫자를 다시 선택하게 된다.
* `pop()`을 빼먹으면 다음 분기에서 이전 선택이 누적돼 오답이 된다.

---

## 📝 회고 KPT

### 🟢 Keep

* 오름차순 제약을 코드 조건문으로 억지 처리하지 않고, `start` 파라미터로 구조적으로 해결했다.
* `push -> dfs -> pop` 백트래킹 패턴을 동일하게 유지했다.

### 🔴 Problem

* 처음에는 `includes`와 비교 조건으로 해결하려고 해서 로직이 복잡해졌다.
* 순열/조합 차이를 코드 구조에서 바로 분리하지 못하면 조건문이 늘어난다.

### 🟡 Try

* "오름차순/중복 금지"가 나오면 우선 `start index` 방식의 조합 DFS를 먼저 떠올린다.
* 백트래킹 문제에서 제약은 조건문보다 탐색 범위 설계(`start`)로 해결하는 습관을 유지한다.

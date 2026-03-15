## 🧩 문제

* **문제 제목** : N과 M (1)
* **문제 레벨** : 실버 3
* **문제 유형** : 백트래킹, DFS
* **문제 제공** : BOJ 15649
* **문제 링크** : https://www.acmicpc.net/problem/15649
* **코드 파일** : [n-and-m-1-15649.js](../../algorithm-JS/Search_Graph/n-and-m-1-15649.js)

---

## 🧩 문제 설명

자연수 `1..N`에서 중복 없이 `M`개를 고른 수열(순열)을 모두 출력하는 문제이다.  
수열은 사전순(오름차순 기준)으로 출력해야 한다.

---

## 🧩 문제 핵심 포인트

* 길이 `M`을 만들 때까지 숫자를 하나씩 선택하는 전형적인 백트래킹 구조이다.
* 이미 선택한 숫자는 다시 쓸 수 없으므로 중복 체크가 필요하다.
* `dfs(0)`에서 시작해 `depth`가 `M`이 되면 수열 완성으로 출력 배열에 저장한다.

---

## 🧩 내 풀이 방식

* `current` 배열에 현재까지 고른 수열을 관리한다.
* `depth === M`이면 `current` 복사본을 `answer`에 넣고 종료한다.
* `1..N`을 순회하면서 이미 고른 값(`current.includes(i)`)은 건너뛴다.
* 선택(`push`) → 재귀(`dfs(depth+1)`) → 복구(`pop`) 흐름으로 탐색한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, M 입력
2. dfs(0) 시작
3. depth === M 이면 current를 answer에 저장
4. i=1..N 순회
   - 이미 current에 있으면 skip
   - push(i) -> dfs(depth+1) -> pop()
5. answer를 줄바꿈 문자열로 출력
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//N과 M(1)
//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const answer = [];
const current = [];
const [N, M] = input[0].split(" ").map(Number);

function dfs(depth) {
  if (depth === M) {
    answer.push([...current]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (current.includes(i)) continue;

    current.push(i);
    dfs(depth + 1);
    current.pop();
  }
}

function solution() {
  dfs(0);
  return answer
    .map((i) => i.join(" "))
    .join("\n");
}

console.log(solution());
```

---

## 🧩 사용된 JS 개념

* 재귀 함수 : 깊이 우선 탐색
* 배열 메서드 `push`, `pop` : 상태 변경/복구(백트래킹)
* 전개 연산자 `[...current]` : 결과 저장 시 참조 분리
* `includes` : 중복 선택 방지

---

## 🧩 복잡도

* 시간복잡도 : `O(P(N, M) * M)` (수열 개수 × 중복 체크/출력 비용)
* 공간복잡도 : `O(M)` (재귀 깊이 + current, 결과 제외)

---

## 🧠 사고 키워드

* 백트래킹
* depth 기반 재귀
* 선택-탐색-복구
* 중복 없는 순열

---

## 🔍 트리거 문장

* "1부터 N까지 자연수 중에서 M개를 고른 수열"
* "중복 없이"
* "모든 경우를 출력"

---

## ⚠️ 오답 포인트

* `dfs(N)`처럼 잘못 시작하면 depth 의미가 깨진다. 시작은 `dfs(0)`이다.
* 결과 저장 시 `answer.push(current)`로 넣으면 참조가 공유되어 전부 같은 값이 된다.
* `pop()`을 빼먹으면 상태 복구가 안 돼서 결과가 틀어진다.

---

## 📝 회고 KPT

### 🟢 Keep

* 재귀 호출 트리를 직접 그려서 `push -> dfs -> pop` 흐름을 확인했다.
* `depth`가 현재까지 선택한 길이라는 점을 명확히 잡고 시작했다.

### 🔴 Problem

* 처음에는 시작 depth를 잘못 잡아(`dfs(N)` 관점) 호출 구조를 헷갈렸다.
* "재귀 들어가기 전에 pop이 실행되는지" 같은 호출 스택 흐름이 혼란스러웠다.

### 🟡 Try

* 앞으로 백트래킹 문제는 항상 `dfs(0)`부터 시작하는 이유를 먼저 확인한다.
* `depth`의 의미를 코드 상단에 한 문장으로 적고 시작한다.
* 재귀 문제는 호출 트리를 간단히라도 그려서 상태 복구 시점을 검증한다.

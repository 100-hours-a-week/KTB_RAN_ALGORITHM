## 🧩 문제

* **문제 제목** : ATM
* **문제 레벨** : Silver IV
* **문제 유형** : 그리디 (Greedy), 누적합 (Prefix Sum)
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/11399
* **코드 파일** : [atm-11399.js](../../algorithm-JS/Search_Graph/atm-11399.js)

---

## 🧩 문제 설명

사람마다 돈을 인출하는 시간이 주어진다.  
사람들의 순서를 적절히 정해, 각 사람이 기다린 시간의 합(총 인출 시간 합)을 최소로 만들어야 한다.

---

## 🧩 문제 핵심 포인트

* 기다림 총합을 최소로 하려면 인출 시간이 짧은 사람부터 처리해야 한다.
* 정렬 후 각 사람의 누적 대기 시간(부분합)을 만들고 모두 더하면 정답이다.
* 핵심은 단일 구간합이 아니라 "누적합들의 총합"을 빠르게 계산하는 것이다.

---

## 🧩 내 풀이 방식

* `arr`를 오름차순 정렬한다. (그리디)
* `prefix[i] = prefix[i-1] + arr[i-1]` 형태로 누적합 배열을 만든다.
* `prefix` 전체를 합산해 최종 답을 구한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 인출 시간 배열 정렬
2. 누적합 배열 prefix 생성
3. prefix 값들을 모두 더해 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, arr) {
  arr.sort((a, b) => a - b);

  const prefix = Array.from({ length: n + 1 }, () => 0);
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
  }

  return prefix.reduce((acc, cur) => acc + cur, 0);
}

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

console.log(solution(n, arr));
```

---

## 🧩 사용된 JS 개념

* `sort((a, b) => a - b)` : 인출 시간 오름차순 정렬
* 누적합 배열 `prefix` : 대기 시간 합 전처리
* `reduce()` : 누적합 전체 총합 계산

---

## 🧩 복잡도

* 시간복잡도 : `O(n log n)` (정렬이 지배)
* 공간복잡도 : `O(n)` (누적합 배열)

---

## 🧠 사고 키워드

* 정렬 그리디
* 누적 대기 시간
* prefix sum

---

## 🔍 트리거 문장

* "총합을 최소로"
* "순서를 정해서 최적화"
* "여러 사람의 대기 시간 합"

---

## ⚠️ 오답 포인트

* 질의형 구간합 문제처럼 보더라도, 이 문제는 먼저 정렬이 핵심인 그리디 문제다.
* 매 사람마다 앞사람 시간을 반복 합산하면 `O(n^2)`가 되어 비효율적이다.
* 한 번 틀렸던 이유처럼, 반복 누적을 질의마다 다시 계산하면 시간이 불필요하게 커진다.

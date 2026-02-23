## 🧩 문제

* **문제 제목** : 구간 합 구하기 4
* **문제 레벨** : Silver III
* **문제 유형** : 누적합 (Prefix Sum)
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/11659
* **코드 파일** : [prefix-sum-11659.js](../../algorithm-JS/Search_Graph/prefix-sum-11659.js)

---

## 🧩 문제 설명

수 `N`개가 주어지고, `M`번의 질의 `(i, j)`가 주어진다.  
각 질의마다 `i`번째 수부터 `j`번째 수까지의 합을 출력하는 문제다.

---

## 🧩 문제 핵심 포인트

* 질의가 여러 번(`M`개) 들어오므로, 매번 구간을 다시 더하면 시간초과 위험이 크다.
* `prefix[k] = 1번부터 k번까지 합`으로 누적합 배열을 미리 만들면 질의 1개를 `O(1)`에 처리할 수 있다.
* 구간합 공식: `sum(i..j) = prefix[j] - prefix[i-1]`

---

## 🧩 내 풀이 방식

* 길이 `N+1`의 누적합 배열 `prefix`를 만들고 `prefix[0] = 0`으로 시작했다.
* `prefix[i] = prefix[i-1] + arr[i-1]`로 한 번에 누적합을 계산했다.
* 각 질의 `(i, j)`마다 `prefix[j] - prefix[i-1]`를 바로 답 배열에 넣었다.
* 마지막에 줄바꿈으로 묶어서 출력했다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, M, 수열 arr, 질의 points 입력
2. prefix[0..N] 누적합 배열 생성
3. 각 (i, j)에 대해 prefix[j] - prefix[i-1] 계산
4. 결과를 줄바꿈으로 출력
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, M, arr, points) {
  const answer = [];
  const prefix = Array.from({ length: N + 1 }, () => 0);

  for (let i = 1; i <= N; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
  }

  for (const [i, j] of points) {
    answer.push(prefix[j] - prefix[i - 1]);
  }

  return answer.join("\n");
}

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const points = input.slice(2, M + 2).map((line) => line.split(" ").map(Number));

console.log(solution(N, M, arr, points));
```

---

## 🧩 사용된 JS 개념

* `Array.from` : `N+1` 크기 누적합 배열 초기화
* 배열 순회 : 누적합 전처리
* 구조 분해 할당 `[i, j]` : 질의 파싱

---

## 🧩 복잡도

* 시간복잡도 : `O(N + M)`
* 공간복잡도 : `O(N)`

---

## 🧠 사고 키워드

* 전처리
* 구간 질의
* 누적합 공식

---

## 🔍 트리거 문장

* "i번째부터 j번째까지 합"
* "합을 구해야 하는 횟수 M"
* "같은 배열에서 구간합을 여러 번 묻는다"

---

## ⚠️ 오답 포인트

* 처음에 `(i..j)`를 매 질의마다 반복문으로 더하면 `O(N×M)`가 되어 시간초과가 난다.
* 예를 들어 `N=100,000`, `M=100,000`이면 최악 `10^10` 연산으로 불가능하다.
* `prefix`를 `N` 크기로 만들면 `i=1`일 때 `i-1` 처리에서 인덱스가 꼬일 수 있어 `N+1`이 안전하다.

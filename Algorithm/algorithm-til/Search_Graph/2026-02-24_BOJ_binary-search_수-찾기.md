## 🧩 문제

- **문제 제목** : 수 찾기
- **문제 레벨** : Silver IV
- **문제 유형** : 이분 탐색, 정렬
- **문제 제공** : BOJ
- **문제 링크** : https://www.acmicpc.net/problem/1920
- **코드 파일** : [find-number-1920.js](../../algorithm-JS/Search_Graph/find-number-1920.js)

---

## 🧩 문제 설명

정수 배열 `A`가 주어지고, 질의 배열 `M`의 각 숫자가 `A`에 존재하는지 확인해야 한다.  
존재하면 `1`, 없으면 `0`을 한 줄씩 출력하면 된다.

---

## 🧩 문제 핵심 포인트

- 질의마다 선형 탐색하면 최악 `O(N*M)`이 되어 비효율적이다.
- `A`를 먼저 정렬한 뒤 각 질의를 이분 탐색하면 `O(logN)`에 판별 가능하다.
- 이 문제의 핵심은 "정렬 + 다중 질의 이분 탐색" 패턴이다.

---

## 🧩 내 풀이 방식

- `A_arr`를 오름차순 정렬한다.
- `M_arr`를 순회하며 각 `target`에 대해 `left`, `right`를 두고 이분 탐색한다.
- 찾으면 `answer`에 `1`, 탐색이 끝날 때까지 못 찾으면 `0`을 넣는다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. A 배열을 정렬한다.
2. 질의 배열 M을 순회한다.
3. 각 질의마다 left/right로 이분 탐색한다.
4. 찾으면 1, 못 찾으면 0을 결과 배열에 담는다.
5. 결과를 줄바꿈으로 합쳐 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, A_arr, M, M_arr) {
  //정렬 먼저 : N logN
  A_arr.sort((a, b) => a - b);

  const answer = [];

  //이분탐색 시작

  for (let target of M_arr) {
    let left = 0;
    let right = N - 1;
    while (left <= right) {
      let midIndex = Math.floor((left + right) / 2);

      if (A_arr[midIndex] === target) {
        answer.push(1);
        break;
      } else if (A_arr[midIndex] > target) {
        right = midIndex - 1;
      } else {
        left = midIndex + 1;
      }
    }

    if (left > right) {
      answer.push(0);
    }
  }

  return answer.join("\n");
}

const N = Number(input[0]);
const A_arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const M_arr = input[3].split(" ").map(Number);

console.log(solution(N, A_arr, M, M_arr));
```

---

## 🧩 사용된 JS 개념

- `Array.prototype.sort((a, b) => a - b)` : 숫자 오름차순 정렬
- `for...of` : 질의 배열 순회
- `Math.floor((left + right) / 2)` : 중간 인덱스 계산

---

## 🧩 복잡도

- 시간복잡도 : `O(NlogN + MlogN)`
- 공간복잡도 : `O(M)` (`answer` 저장)

---

## 🧠 사고 키워드

- 정렬 후 탐색
- 다중 질의 처리
- 존재 여부 판별

---

## 🔍 트리거 문장

- "수 찾기"
- "존재하면 1, 없으면 0"
- "여러 개의 수를 빠르게 판별"

---

## ⚠️ 오답 포인트

- 정렬하지 않고 이분 탐색하면 결과가 보장되지 않는다.
- 숫자 정렬에서 기본 `sort()`를 쓰면 문자열 기준 정렬이 되어 오답이 난다.
- 찾은 뒤 `break`하지 않으면 같은 질의에서 중복 push 위험이 생긴다.

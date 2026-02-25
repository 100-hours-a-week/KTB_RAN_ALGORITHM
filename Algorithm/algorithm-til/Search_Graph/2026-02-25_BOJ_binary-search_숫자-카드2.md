## 🧩 문제

- **문제 제목** : 숫자 카드 2
- **문제 레벨** : Silver IV
- **문제 유형** : 이분 탐색, lower/upper bound
- **문제 제공** : BOJ
- **문제 링크** : https://www.acmicpc.net/problem/10816
- **코드 파일** : [number-card2-10816.js](../../algorithm-JS/Search_Graph/number-card2-10816.js)

---

## 🧩 문제 설명

상근이가 가진 카드 숫자 배열 `N_arr`와 질의 배열 `M_arr`가 주어진다.  
각 질의 값이 카드 배열에 몇 개 있는지 순서대로 출력하면 된다.

---

## 🧩 문제 핵심 포인트

- 존재 여부(0/1)가 아니라 **개수**를 구해야 한다.
- 정렬 후 `lower bound`(처음 위치), `upper bound`(초과 첫 위치)를 찾으면 개수는 `upper - lower`이다.
- 질의마다 선형 탐색하면 느리므로 이분 탐색 2회가 핵심이다.

---

## 🧩 내 풀이 방식

- `N_arr`를 오름차순 정렬한다.
- 각 `target`마다:
- `target <= A[mid]` 조건으로 lower bound를 찾는다.
- `target < A[mid]` 조건으로 upper bound를 찾는다.
- `upperIndex - lowerIndex`를 답 배열에 넣는다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 카드 배열을 정렬한다.
2. 질의값 하나를 고른다.
3. 이분 탐색으로 lower bound를 찾는다.
4. 이분 탐색으로 upper bound를 찾는다.
5. upper-lower를 답에 저장한다.
6. 모든 질의를 처리한 뒤 공백으로 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, N_arr, M, M_arr) {
  //이분탐색
  let leftIndex = 0;
  let rightIndex = N - 1;

  let answer = [];

  N_arr.sort((a, b) => a - b);

  for (let target of M_arr) {
    let leftIndex = 0;
    let rightIndex = N - 1;
    let lowerIndex = N;

    //여기에 처음과 끝을 찾는 upperBound, downBound
    //앞에 찾기
    while (leftIndex <= rightIndex) {
      let mid = Math.floor((leftIndex + rightIndex) / 2);

      //여기에 처음과 끝을 찾는 upperBound, downBound
      if (target <= N_arr[mid]) {
        lowerIndex = mid; //후보 저장
        rightIndex = mid - 1; //더 탐색
      } else {
        leftIndex = mid + 1;
      }
    }

    leftIndex = 0;
    rightIndex = N - 1;
    let upperIndex = N;

    //뒤에 찾기
    while (leftIndex <= rightIndex) {
      let mid = Math.floor((leftIndex + rightIndex) / 2);

      //여기에 처음과 끝을 찾는 upperBound, downBound
      if (target < N_arr[mid]) {
        upperIndex = mid; //후보 저장
        rightIndex = mid - 1; //더 탐색
      } else {
        leftIndex = mid + 1;
      }
    }

    answer.push(upperIndex - lowerIndex);
  }

  return answer.join(" ");
}

const N = Number(input[0]);
const N_arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const M_arr = input[3].split(" ").map(Number);

console.log(solution(N, N_arr, M, M_arr));
```

---

## 🧩 사용된 JS 개념

- `sort((a,b)=>a-b)` : 숫자 오름차순 정렬
- `while (left <= right)` : 이분 탐색 루프
- `answer.join(" ")` : 요구 출력 포맷 처리

---

## 🧩 복잡도

- 시간복잡도 : `O(NlogN + MlogN)`
- 공간복잡도 : `O(M)`

---

## 🧠 사고 키워드

- 빈도수 질의
- lower/upper bound
- 경계 인덱스 차이

---

## 🔍 트리거 문장

- "몇 개 가지고 있는가?"
- "중복 허용 배열에서 개수 출력"
- "여러 질의에 빠르게 답하기"

---

## ⚠️ 오답 포인트

- lower/upper 조건(`<=`, `<`)을 바꾸면 개수가 틀어진다.
- 정렬 없이 이분 탐색하면 경계 인덱스가 의미가 없다.
- 못 찾았을 때 인덱스 기본값을 `N`으로 두지 않으면 계산이 틀릴 수 있다.

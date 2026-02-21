## 🧩 문제

* **문제 제목** : 랜선 자르기
* **문제 레벨** : Silver II
* **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, Upper Bound 성격
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/1654
* **코드 파일** : [lan-cable-1654.js](../../algorithm-JS/Search_Graph/lan-cable-1654.js)

---

## 🧩 문제 설명

길이가 제각각인 `K`개의 랜선을 잘라서 길이가 같은 랜선 `N`개 이상을 만들어야 한다.  
만들 수 있는 랜선 길이의 최댓값을 구하는 문제다.

---

## 🧩 문제 핵심 포인트

* 길이 `L`을 정하면 만들 수 있는 랜선 개수 `f(L)`를 계산할 수 있다.
* `L`이 커질수록 `f(L)`는 감소(또는 유지)하므로 단조성이 있다.
* 목표는 `f(L) >= N`을 만족하는 **가장 큰 `L`**이다.
* 이전 Factory Machines가 "최소 시간" 문제였다면, 이 문제는 반대로 "최대 길이"를 찾는다.

---

## 🧩 내 풀이 방식

* 탐색 구간을 `left = 1`, `right = max(lines)`로 둔다.
* `mid` 길이에서 전체 개수 `totalCount = Σ(line / mid)`를 계산한다.
* `totalCount >= N`이면 현재 길이는 가능하므로 `answer = mid` 저장 후 더 긴 길이를 보기 위해 `left = mid + 1`.
* `totalCount < N`이면 길이가 너무 길어서 개수가 부족하므로 `right = mid - 1`.
* 반복 종료 후 `answer`가 최댓값이다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. left=1, right=max(lines), answer=0
2. while(left <= right)
3. mid 길이에서 만들 수 있는 개수 totalCount 계산
4. totalCount >= N 이면 answer=mid, left=mid+1
5. totalCount < N 이면 right=mid-1
6. 반복 종료 후 answer 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(K, N, lines) {
  let left = 1;
  let right = Math.max(...lines);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let totalCount = 0;
    for (const line of lines) {
      totalCount += Math.floor(line / mid);
    }

    if (totalCount >= N) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

const [K, N] = input[0].split(" ").map(Number);
const lines = input.slice(1, K + 1).map(Number);

console.log(solution(K, N, lines));
```

---

## 🧩 사용된 JS 개념

* `Math.floor()` : 랜선을 자른 개수 계산, 중간 길이 계산
* `Math.max(...lines)` : 탐색 상한(최대 가능한 길이) 설정
* 이분탐색 반복문 : 조건 만족 구간 경계 조정

---

## 🧩 복잡도

* 시간복잡도 : `O(K log M)` (`M = max(lines)`)
* 공간복잡도 : `O(1)` (입력 저장 제외)

---

## 🧠 사고 키워드

* 파라메트릭 서치
* 단조성
* 최대 feasible 값 찾기

---

## 🔍 트리거 문장

* "같은 길이로 잘라서 N개 이상 만들기"
* "가능한 최대 길이"
* "정답 길이를 직접 구하지 말고 가능 여부를 판별"

---

## ⚠️ 오답 포인트

* `가능할 때 right를 줄이는` lower bound 패턴을 그대로 쓰면 정답 방향이 반대가 된다.
* `totalCount >= N`일 때 멈추면 최댓값을 놓칠 수 있다.
* Factory Machines(최소 시간)와 동일한 구조지만 경계 이동 방향(`left/right`)이 반대라는 점을 놓치기 쉽다.

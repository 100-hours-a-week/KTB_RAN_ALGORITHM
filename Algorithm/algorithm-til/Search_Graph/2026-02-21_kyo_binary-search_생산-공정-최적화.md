## 🧩 문제

* **문제 제목** : 생산 공정 최적화 (Factory Machines)
* **문제 레벨** : CSES 1620
* **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, Lower Bound
* **문제 제공** : CSES
* **문제 링크** : https://cses.fi/problemset/task/1620
* **코드 파일** : [factory-machines-1620.js](../../algorithm-JS/Search_Graph/factory-machines-1620.js)

---

## 🧩 문제 설명

여러 대의 기계가 동시에 제품을 생산한다.  
각 기계는 고정 시간마다 제품 1개를 만든다.  
목표 생산량 `n`개를 만들기 위한 최소 시간 `T`를 구해야 한다.

---

## 🧩 문제 핵심 포인트

* 이 문제는 `target 값을 찾는 이분탐색`이 아니라 `조건을 처음 만족하는 시간`을 찾는 문제다.
* `f(time) = time 동안 만들 수 있는 총 제품 수`는 시간이 커질수록 절대 감소하지 않는다.
* 따라서 `f(time) >= n`을 만족하는 최초 시간(첫 번째 `true`)을 lower bound로 찾을 수 있다.
* 시간 범위가 매우 커서 (`최대 약 10^18`) JS에서는 `BigInt` 처리가 안전하다.

---

## 🧩 내 풀이 방식

* 탐색 구간을 `left = 1`, `right = max(speeds) * n`으로 둔다.
* `mid` 시간에서 전체 생산량 `total = Σ(mid / speed[i])`를 계산한다.
* `total >= n`이면 현재 시간으로도 가능하므로 답 후보를 저장하고 왼쪽 구간을 더 탐색한다.
* `total < n`이면 시간이 부족하므로 오른쪽 구간으로 이동한다.
* 탐색 종료 후 저장된 `answer`가 최소 시간이다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. left=1, right=maxSpeed*n 설정
2. while(left <= right) 반복
3. mid에서 total(생산량) 계산
4. total >= n 이면 answer=mid, right=mid-1
5. total < n 이면 left=mid+1
6. 반복 종료 후 answer 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, speeds) {
  let left = 1n;
  const maxSpeed = speeds.reduce((acc, cur) => (acc > cur ? acc : cur), 0n);
  let right = maxSpeed * n;
  let answer = right;

  while (left <= right) {
    const mid = (left + right) / 2n;

    let total = 0n;
    for (const time of speeds) {
      total += mid / time;
      if (total >= n) break;
    }

    if (total >= n) {
      answer = mid;
      right = mid - 1n;
    } else {
      left = mid + 1n;
    }
  }

  return answer;
}

let n;
let speeds;

const firstLine = input[0].split(" ").map(BigInt);

if (firstLine.length === 2 && input.length >= 2) {
  const machineCount = Number(firstLine[0]);
  n = firstLine[1];
  speeds = input[1].split(" ").slice(0, machineCount).map(BigInt);
} else {
  n = firstLine[0];
  speeds = input[1].split(" ").map(BigInt);
}

console.log(solution(n, speeds).toString());
```

---

## 🧩 사용된 JS 개념

* `BigInt` : 큰 시간 범위(최대 `10^18`) 정확 계산
* `reduce()` : 가장 느린 기계 시간(`maxSpeed`) 계산
* 이분탐색 패턴 : `while (left <= right)` + 경계 이동

---

## 🧩 복잡도

* 시간복잡도 : `O(m log(maxSpeed * n))` (`m = speeds.length`)
* 공간복잡도 : `O(1)` (입력 저장 제외)

---

## 🧠 사고 키워드

* 파라메트릭 서치
* 단조성 (monotonic)
* lower bound (첫 번째 true)

---

## 🔍 트리거 문장

* "최소 시간"
* "모든 기계가 동시에 생산"
* "시간이 주어지면 생산량을 계산할 수 있다"

---

## ⚠️ 오답 포인트

* `total === n`에서 바로 `break`하면 최소 시간이 아니라 중간 값을 반환할 수 있다.
* 이 문제를 `arr[mid] == target` 형태의 일반 이분탐색으로 생각하면 경계 처리가 틀린다.
* JS `Number`로 `right = maxSpeed * n`를 잡으면 큰 케이스에서 정밀도 문제가 생길 수 있다.

## 🧩 문제

* **문제 제목** : 나무 자르기
* **문제 레벨** : Silver II
* **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, 최대값 탐색
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/2805
* **코드 파일** : [tree-cut-2805.js](../../algorithm-JS/Search_Graph/tree-cut-2805.js)

---

## 🧩 문제 설명

나무 높이 배열이 주어질 때, 절단기 높이 `H`를 정해 나무를 자른다.  
`H`보다 큰 나무는 윗부분이 잘리고, 잘린 길이들의 합을 가져간다.  
적어도 `M`미터를 얻으면서 설정할 수 있는 `H`의 최댓값을 구하는 문제다.

---

## 🧩 문제 핵심 포인트

* 높이 `H`를 정하면 가져갈 수 있는 나무 길이 `f(H)`를 계산할 수 있다.
* `H`가 커질수록 `f(H)`는 감소(또는 유지)하므로 단조성이 있다.
* 목표는 `f(H) >= M`을 만족하는 **가장 큰 `H`**를 찾는 것.
* Factory Machines(최소 시간)와 반대로, 이 문제는 최댓값을 구하므로 경계 이동 방향이 반대다.

---

## 🧩 내 풀이 방식

* `left = 0`, `right = max(trees)`로 탐색 구간을 잡는다.
* `mid`를 절단기 높이로 두고 잘린 길이 합 `total`을 계산한다.
* `total >= M`이면 현재 높이도 가능하므로 `answer = mid` 저장 후 더 큰 높이를 보기 위해 `left = mid + 1`.
* `total < M`이면 나무가 부족하므로 `right = mid - 1`.
* 반복 종료 후 `answer`가 가능한 최대 절단기 높이.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. left=0, right=max(trees), answer=0
2. while(left <= right)
3. mid에서 잘린 나무 총합 total 계산
4. total >= M 이면 answer=mid, left=mid+1
5. total < M 이면 right=mid-1
6. 반복 종료 후 answer 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, M, trees) {
  let left = 0;
  let right = Math.max(...trees);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let total = 0;
    for (const tree of trees) {
      const cut = tree - mid;
      if (cut > 0) total += cut;
    }

    if (total >= M) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

const [N, M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

console.log(solution(N, M, trees));
```

---

## 🧩 사용된 JS 개념

* `Math.max(...trees)` : 절단기 높이 탐색 상한 설정
* `Math.floor()` : 중간 높이 계산
* 조건 누적 합 계산 : 잘린 길이 총합 구하기

---

## 🧩 복잡도

* 시간복잡도 : `O(N log H)` (`H = max(trees)`)
* 공간복잡도 : `O(1)` (입력 저장 제외)

---

## 🧠 사고 키워드

* 단조 함수
* 파라메트릭 서치
* 최대 feasible 값

---

## 🔍 트리거 문장

* "적어도 M미터"
* "절단기 높이의 최댓값"
* "가능한 최대/최소 값 찾기"

---

## ⚠️ 오답 포인트

* `total >= M`일 때 `right`를 줄이면 최소값 탐색이 되어 정답이 틀어진다.
* `total === M`에서 바로 종료하면 더 큰 가능한 높이를 놓칠 수 있다.
* Factory Machines 코드와 뼈대는 같아도, 경계 이동(`left/right`) 방향이 반대라는 점을 놓치기 쉽다.

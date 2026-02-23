## 🧩 문제

* **문제 제목** : 입국심사
* **문제 레벨** : Level 3
* **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, Lower Bound
* **문제 제공** : Programmers
* **문제 링크** : https://school.programmers.co.kr/learn/courses/30/lessons/43238
* **코드 파일** : [immigration-43238.js](../../algorithm-JS/Search_Graph/immigration-43238.js)

---

## 🧩 문제 설명

여러 심사관이 동시에 사람을 심사한다.  
각 심사관마다 1명을 처리하는 시간이 다를 때, `n`명을 모두 심사하기 위한 최소 시간을 구하는 문제다.

---

## 🧩 문제 핵심 포인트

* 시간 `t`가 주어지면 처리 가능한 인원 `f(t)`를 계산할 수 있다.
* `f(t)`는 시간이 증가할수록 절대 감소하지 않는 단조 함수다.
* 따라서 `f(t) >= n`을 만족하는 최초 시간(첫 번째 true)을 이분탐색으로 찾는다.
* `[kyo] 생산 공정 최적화 (CSES 1620)`와 본질적으로 같은 패턴이다.

---

## 🧩 내 풀이 방식

* 탐색 구간을 `left = 1`, `right = max(times) * n`으로 잡는다.
* `mid` 시간에서 `total += Math.floor(mid / time)`으로 총 처리 인원을 계산한다.
* `total >= n`이면 가능한 시간이므로 `answer = mid` 저장 후 더 작은 시간을 찾기 위해 `right = mid - 1`.
* `total < n`이면 시간이 부족하므로 `left = mid + 1`.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. left=1, right=max(times)*n
2. while(left <= right) 반복
3. mid 시간에서 총 심사 가능 인원 total 계산
4. total >= n 이면 answer=mid, right=mid-1
5. total < n 이면 left=mid+1
6. 반복 종료 후 answer 반환
```

---

## 🧩 코드 구현 (내 풀이)

```js
function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n;
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let total = 0;
    for (const time of times) {
      total += Math.floor(mid / time);
    }

    if (total >= n) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}
```

---

## 🧩 사용된 JS 개념

* `Math.max(...times)` : 탐색 상한 계산
* `Math.floor()` : mid 시간에서 처리 인원 계산
* 이분탐색 경계 이동 : 최초 true 탐색

---

## 🧩 복잡도

* 시간복잡도 : `O(m log(max(times) * n))` (`m = times.length`)
* 공간복잡도 : `O(1)`

---

## 🧠 사고 키워드

* 단조성
* 파라메트릭 서치
* 최소 feasible 값

---

## 🔍 트리거 문장

* "모두 심사하는 데 걸리는 최소 시간"
* "여러 심사대가 동시에 처리"
* "처리 시간 배열 + 목표 인원"

---

## ⚠️ 오답 포인트

* `total === n`에서 멈추면 최소 시간이 아니라 중간 feasible 시간이 될 수 있다.
* 일반 `target == arr[mid]` 탐색으로 생각하면 경계 처리에 실패한다.
* 입력이 매우 클 때는 Number 정밀도 이슈를 의식해야 한다.

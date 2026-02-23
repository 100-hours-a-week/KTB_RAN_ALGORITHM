## 🧩 문제

* **문제 제목** : 공유기 설치
* **문제 레벨** : Gold V
* **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, 그리디 체크
* **문제 제공** : BOJ
* **문제 링크** : https://www.acmicpc.net/problem/2110
* **코드 파일** : [router-install-2110.js](../../algorithm-JS/Search_Graph/router-install-2110.js)

---

## 🧩 문제 설명

수직선 위에 집 `N`개가 있고, 공유기 `C`개를 설치한다.  
한 집에는 공유기 하나만 설치 가능하다.  
설치한 공유기들 중 **가장 인접한 두 공유기 사이 거리**를 최대화해야 한다.

---

## 🧩 문제 핵심 포인트

* 목표는 "거리의 최댓값"이다.
* 거리 `mid`를 정하면 "`mid` 이상 간격으로 C개 설치 가능한가?"를 판별할 수 있다.
* 이 판별 결과는 단조적이다:
  * `mid`가 가능하면 더 작은 거리도 가능
  * `mid`가 불가능하면 더 큰 거리도 불가능
* 그래서 이분탐색으로 최대 가능한 `mid`를 찾는다.

---

## 🧩 내 풀이 방식

* 먼저 집 좌표를 오름차순 정렬한다.  
  (질문했던 "무엇이 정렬되어 있어야 하냐?"의 답: 집 좌표가 정렬되어야 거리 계산이 일관된다.)
* `placeCheck(placeArr, mid, C)` 함수로 설치 가능 여부를 확인한다.
* 설치 체크는 왼쪽부터 "가능하면 설치"하는 그리디 방식이다.
  이 부분이 "그리드 같다"가 아니라, 정확히는 **그리디 배치**다.
* 가능하면 거리를 더 키우기 위해 `start = mid + 1`,
  불가능하면 거리를 줄이기 위해 `end = mid - 1`.
* 최종 `end`가 최대 가능한 최소 거리다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 집 좌표 정렬
2. start=1, end=(최대좌표-최소좌표)
3. mid 거리 시도
4. placeCheck로 C개 이상 설치 가능 여부 확인
5. 가능하면 start=mid+1 (더 큰 거리 도전)
6. 불가능하면 end=mid-1 (거리 완화)
7. 반복 종료 후 end 반환
```

### 네 주석 포인트 그대로 해설

1. "최대한의 거리"  
   -> 가장 가까운 두 공유기 거리(최소 간격)를 최대화하는 문제.

2. "이게 왜 이분탐색임?"  
   -> 거리 `d`에 대해 가능/불가능이 단조성(한 번 false면 그 이상은 전부 false)을 가지기 때문.

3. "뭐가 정렬되어 있어야 되는 거임?"  
   -> 집 좌표 배열이 정렬되어야, 이전 설치 위치와 현재 위치의 거리 계산이 올바르게 이어진다.

4. "mid 거리로 공유기 C개 이상 설치 가능한가?" 체크 방법
   - 1) 첫 집에는 무조건 설치
   - 2) 이전 설치 위치 기억
   - 3) 거리 `>= mid` 이면 설치
   - 4) 설치 개수 세기
   - 5) 최종 개수가 `C` 이상이면 true

5. `placeCheck`가 사실상 핵심
   -> 정답 거리인지 직접 맞추는 게 아니라, 후보 거리가 가능한지만 빠르게 판별한다.

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function placeCheck(placeArr, mid, c) {
  let installedPos = placeArr[0];
  let count = 1;

  for (let i = 1; i < placeArr.length; i++) {
    const d = placeArr[i] - installedPos;
    if (d >= mid) {
      installedPos = placeArr[i];
      count += 1;
    }
  }

  return count >= c;
}

function solution(n, c, placeArr) {
  placeArr.sort((a, b) => a - b);

  let start = 1;
  let end = placeArr[placeArr.length - 1] - placeArr[0];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (placeCheck(placeArr, mid, c)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return end;
}

const [n, c] = input[0].split(" ").map(Number);
const placeArr = input.slice(1, n + 1).map(Number);

console.log(solution(n, c, placeArr));
```

---

## 🧩 사용된 JS 개념

* `sort((a, b) => a - b)` : 좌표 정렬
* 함수 분리(`placeCheck`) : 판별 로직 캡슐화
* 이분탐색 루프 : 거리 후보의 가능/불가능 경계 탐색

---

## 🧩 복잡도

* 시간복잡도 : `O(N log D)` (`D = 최대좌표-최소좌표`)
* 공간복잡도 : `O(1)` (입력 저장 제외)

---

## 🧠 사고 키워드

* 최대 최소 거리
* 가능/불가능 판별
* 정렬 + 그리디 체크 + 이분탐색

---

## 🔍 트리거 문장

* "가장 인접한 두 공유기 사이 거리 최대"
* "공유기 C개 설치"
* "최대화 + 입력 범위 큼"

---

## ⚠️ 오답 포인트

* 좌표 정렬 없이 거리 체크를 하면 판별 자체가 깨진다.
* 가능할 때 `end`를 줄이면 최대 거리를 놓친다.
* `placeCheck`에서 첫 집 설치를 빼먹으면 개수 계산이 1씩 어긋난다.

### `return start` vs `return end` 결정법

이 부분이 파라메트릭 서치의 핵심이다.

현재 공유기 설치 코드는 판별 결과가 아래 형태다.

```txt
true true true true false false false
```

이때 루프는 아래처럼 돈다.

```js
if (placeCheck(mid)) {
  start = mid + 1;
} else {
  end = mid - 1;
}
```

종료 시점에는 항상:

```txt
start = 첫 false
end   = 마지막 true
```

즉, 이 문제처럼 "가능한 거리의 최댓값"을 찾는 경우 정답은 `end`다.

왜냐하면:

1. `true`를 만나면 `start`를 오른쪽으로 밀어 더 큰 값을 시도한다.
2. `false`를 만나면 `end`를 왼쪽으로 당겨 실패 구간을 버린다.
3. 결국 `start`는 실패 구간 첫 값, `end`는 성공 구간 마지막 값에서 만나 종료한다.

예시:

```txt
1 2 3 4 5 6 7 8 9
T T T T F F F F F
```

루프 종료:

```txt
start = 5 (첫 false)
end   = 4 (마지막 true)
```

그래서 `return end`.

반대로 판별 결과가 아래처럼 생긴 문제라면:

```txt
false false false true true true
```

정답은 "첫 true"이므로 보통 `return start` 패턴이 된다.

한 줄 요약:

```txt
마지막 true를 찾으면 return end
첫 true를 찾으면 return start
```

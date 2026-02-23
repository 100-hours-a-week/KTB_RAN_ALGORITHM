## 🧩 문제

- **문제 제목** : 깨지는 유리 다리 건너기
- **문제 레벨** : 강의 문제집
- **문제 유형** : 이분탐색 (Binary Search), 파라메트릭 서치, 그리디 체크
- **문제 제공** : Inflearn Kyo
- **문제 링크** : 강의 문제집 내 제공 문제
- **코드 파일** : [broken-glass-bridge-kyo.js](../../algorithm-JS/Search_Graph/broken-glass-bridge-kyo.js)

---

## 🧩 문제 설명

각 유리판에는 내구도가 있고, 사람이 지나가면 내구도가 소모된다고 가정한다.  
연속해서 깨진 유리판이 `k`개 이상 생기면 더 이상 건널 수 없다.  
최대 몇 명(또는 실패 경계 인원)까지 건널 수 있는지 구하는 문제다.

---

## 🧩 문제 핵심 포인트

- "가능/불가능"이 인원수에 대해 단조적으로 바뀌므로 이분탐색이 가능하다.
- `mid`명을 시도했을 때, 연속으로 깨진 판이 `k`개 이상인지 확인하는 검증 함수가 핵심이다.
- 검증 함수에서 중요한 상태값은 `brokenCount` 하나다.
- 이 문제는 입국심사/생산 공정 최적화와 같은 파라메트릭 서치 계열이다.

---

## 🧩 내 풀이 방식

- `checkGlass(glass, mid, k)`로 "`mid`명을 시도하면 통과 가능한가?"를 판단한다.
- 순회 중 `glass[i] <= mid`면 해당 칸은 깨진 것으로 보고 `brokenCount++`.
- 중간에 멀쩡한 칸이 나오면 연속이 끊기므로 `brokenCount = 0`으로 초기화한다.
- `brokenCount >= k`가 되는 순간 더 이상 건널 수 없으므로 `false` 반환.
- 이분탐색에서
  - 가능(`true`)하면 인원을 늘려보려고 `start = mid + 1`
  - 불가능(`false`)하면 인원을 줄여 `end = mid - 1`
- 반복 종료 후 `start`를 반환한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. start=1, end=200000000으로 인원수 탐색 범위 설정
2. mid(현재 시도 인원) 계산
3. checkGlass로 mid 인원이 가능한지 검증
4. 가능하면 start를 올려 더 큰 인원 시도
5. 불가능하면 end를 낮춰 더 작은 인원 시도
6. 반복 종료 후 start 반환
```

### 주석으로 달아둔 포인트 해설

1. "`brokenCount`는 왜 필요한가?"
   깨진 유리판이 연속으로 몇 칸인지 추적하기 위해 필요하다.  
   이 문제가 막히는 조건은 "연속 `k`칸"이기 때문이다.

2. "`glass[i] <= mid` 조건 의미"
   `mid`명을 시도할 때, 내구도가 `mid` 이하인 칸은 버티지 못한다고 보는 기준이다.

3. "`else { brokenCount = 0 }` 초기화 이유"
   연속 깨짐이 핵심이므로, 안 깨진 칸이 나오면 연속 카운트를 끊어야 한다.

4. "`brokenCount >= k`면 바로 false"
   이미 실패 조건을 만족했기 때문에 뒤를 더 볼 필요가 없다(조기 종료).

5. "왜 가능하면 `start = mid + 1`?"
   더 많은 인원도 가능한지 오른쪽(큰 값)으로 탐색해야 최대 경계를 찾을 수 있다.

---

## 🧩 코드 구현 (내 풀이)

```js
function checkGlass(glass, mid, k) {
  //깨진 유리판 수
  let brokenCount = 0;

  //동작 방법(brokenCount)
  //2,4,5,2,1 k=2/mid=4
  //깨 깨 안깨 깨 깨
  //1 2 0 1 2
  //-> 덕분에 초기화

  for (let i = 0; i < glass.length; i++) {
    //ex glass 내구도는 4인데 사람 수는(mid) 5명일 경우 glass 깨짐
    if (glass[i] <= mid) {
      brokenCount++;
    } else {
      brokenCount = 0; // 안깨진 부분 등장 시 초기화
    }

    //k는 2이상일 경우 2까지만 뛸수있다.
    if (brokenCount >= k) {
      return false;
    }
  }
  return true;
}

function solution(glass, k) {
  let start = 1;
  let end = 200000000;

  //이분탐색 시작
  while (start <= end) {
    //mid : 현재 시도하는 참가자 수
    //이분탐색 특: mid만 계산함.
    let mid = Math.floor((start + end) / 2);

    //유리 내구도 상태까지 건널수있는지 확인하는 함수 사용
    if (checkGlass(glass, mid, k)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

console.log(solution([5, 3, 1, 2, 1, 3, 5], 3));
console.log(solution([4, 2, 2, 1, 4], 2));
```

---

## 🧩 사용된 JS 개념

- `Math.floor()` : 이분탐색 중간값 계산
- 상태 변수(`brokenCount`) : 연속 구간 길이 추적
- 조기 종료(`return false`) : 실패 조건 즉시 판정

---

## 🧩 복잡도

- 시간복잡도 : `O(L log R)` (`L=glass.length`, `R=탐색 범위`)
- 공간복잡도 : `O(1)`

---

## 🧠 사고 키워드

- 가능/불가능 경계
- 연속 구간 카운팅
- 파라메트릭 서치

---

## 🔍 트리거 문장

- "최대 몇 명까지 가능한가"
- "연속해서 깨진 칸이 k개 이상이면 실패"
- "입력 범위가 커서 완전탐색이 어렵다"

---

## ⚠️ 오답 포인트

- `brokenCount`를 끊어주지 않으면 연속 조건이 아닌 전체 개수로 잘못 판정한다.
- `>= k`를 `> k`로 쓰면 경계에서 오답이 난다.
- 가능할 때 왼쪽으로 이동하면 최대 경계를 찾지 못한다.

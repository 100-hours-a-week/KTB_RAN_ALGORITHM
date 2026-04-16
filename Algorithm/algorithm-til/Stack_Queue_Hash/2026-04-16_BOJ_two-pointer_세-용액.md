## 🧩 문제

* **문제 제목** : 세 용액
* **문제 레벨** : Gold 3
* **문제 유형** : 투 포인터 (Two Pointers), 정렬
* **문제 제공** : BOJ 2473
* **문제 링크** : https://www.acmicpc.net/problem/2473
* **코드 파일 (Python)** : (별도 파일 미생성, 아래 코드 블록 기준)

---

## 🧩 문제 설명

용액들의 특성값이 주어질 때, **서로 다른 세 용액**을 골라 합성한 값이 `0`에 가장 가깝게 만드는 조합을 찾는 문제다.

예시처럼 `[-2, 6, -97, -6, 98]`이면 `(-97) + (-2) + 98 = -1`이 되어 `0`에 가장 가깝다.

---

## 🧩 문제 핵심 포인트

* 목표는 "합이 0에 가까운가"이므로 `abs(sum)`이 작을수록 좋은 답이다.
* 배열 정렬 후, 한 원소를 고정하고 나머지 두 원소를 투 포인터로 찾으면 된다.
* 정렬 상태에서
  * 합이 크면(`> 0`) `right--`
  * 합이 작으면(`<= 0`) `left++`
  로 0 쪽으로 수렴시킬 수 있다.

---

## 🧩 내 풀이 방식

처음에는 "구간합"처럼 생각했지만, 이 문제는 연속 구간이 아니라 **3개 원소 선택 최적화**다.  
그래서 정렬 + 고정점 + 양끝 투포인터 방식으로 전환했다.

* `fix_index`를 하나 고정한다.
* `left = fix+1`, `right = n-1`에서 시작한다.
* 현재 합 `value = arr[fix] + arr[left] + arr[right]`를 계산한다.
* `abs(value)`가 최소값보다 작으면 정답 갱신.
* `value > 0`이면 합이 크므로 `right -= 1`, 아니면 `left += 1`.
* 모든 `fix_index`를 순회해 전체 최적해를 찾는다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. 입력 배열 정렬
2. min_v = inf, answer = [0,0,0] 초기화
3. fix_index를 0부터 n-3까지 순회
4. left=fix+1, right=n-1로 투포인터 시작
5. value = arr[fix] + arr[left] + arr[right]
6. abs(value)가 더 작으면 answer 갱신
7. value > 0 이면 right--, 아니면 left++
8. 모든 경우 탐색 후 answer 출력
```

### 그림으로 보는 포인터

```txt
[-2 -1  0  1  2]
 i   L        R
```

정렬 기준 이동 규칙:

* 합이 크면 → `right` 줄임
* 합이 작으면 → `left` 늘림

---

## 🧩 코드 구현 (내 풀이)

```python
import sys

sys.stdin = open("../예제.txt")
input = sys.stdin.readline

#구간합

#다 합친 값을 0으로 만들 것이다.
#주어진 용액들의 특성값이 [-2, 6, -97, -6, 98]인 경우에는
#특성값이 -97와 -2인 용액과 특성값이 98인 용액을 혼합하면 특성값이 -1인 용액을 만들 수 있고,
#이 용액이 특성값이 0에 가장 가까운 용액이다.
#세 개의 서로 다른 용액을 혼합하여 특성값이 0에 가장 가까운 용액

#투포인터 처럼 양끝점을 잡고 시작?

n = int(input())
arr = list(map(int,input().split()))

arr.sort()

min_v = float('inf');
answer = [0,0,0];

#0에 더 가까운걸 어떻게 인식시키지?
#0에서 뺏 절댓값의 수가 낮을때

#투포인터
#1. 배열 정렬
#2. 하나 고정 (i)
#3. 나머지 두 개는 투포인터 (left, right)
#그림으로
# [-2 -1 0 1 2 ]
#  i  L      R

#정렬하면
#합이 크면 → right 줄임
#합이 작으면 → left 늘림


for fix_index in range(n-2) :
    left_index = fix_index+1
    right_index = n-1

    #해당 fix_index를 지정하고 모두 탐색하고 넘어가야됨.
    while left_index < right_index :
        value = arr[fix_index] + arr[left_index] + arr[right_index]

        if abs(value) < min_v:
            min_v = abs(value)
            answer = [arr[fix_index], arr[left_index], arr[right_index]]

        if value > 0 :
            #다 더한 값이 0보다 클경우엔 right를 --
            right_index-=1;
        else :
            #다 더한 값이 0보다 작을 경우엔 더 증가시켜야됨.
            left_index+=1



print(*answer)
```

---

## 🧩 시행착오 및 수정 사항

### 1) 처음 시간초과가 났던 코드 (`O(n^3)`)

```python
import sys

input = sys.stdin.readline


n = int(input())
arr = list(map(int,input().split()))

min_v = 100;
answer = [0,0,0];

#0에 더 가까운걸 어떻게 인식시키지?
#0에서 뺏 절댓값의 수가 낮을때


for l_index in range(n) :
    for r_index in range(1, n) :
        for m_index in range(2,n) :

            value = arr[l_index] + arr[r_index] + arr[m_index]
            if abs(0 - value) < abs(min_v) :
                min_v = value
                answer[0] = arr[l_index]
                answer[1] = arr[r_index]
                answer[2] = arr[m_index]


print(*sorted(answer))
```

왜 시간초과였는지:

* 3중 반복문이라 시간복잡도가 `O(n^3)`이고, `n`이 큰 입력에서 통과가 어렵다.
* 문제는 서로 다른 3개 인덱스를 써야 하는데, 이 루프 구조는 같은 인덱스/중복 조합을 많이 검사한다.
* `min_v = 100` 같은 작은 고정 초기값은 안전하지 않다. (`inf` 초기화가 안정적)

개선 방향:

* 정렬 후 한 원소 고정 + 투포인터로 `O(n^2)`로 낮춘다.
* `left = fix+1`, `right = n-1`로 시작해 중복 선택을 줄이고 이동 방향을 명확히 한다.

---

## 🧩 사용된 Python 개념

* `arr.sort()` : 투포인터 성립을 위한 단조성 확보
* `abs(x)` : `0`에 얼마나 가까운지 평가
* 3중 선택 최적화의 `O(n^2)` 스캔 (고정점 + 양포인터)
* `print(*answer)` : 공백 구분 출력

---

## 🧩 복잡도

* 시간복잡도 : `O(n^2)` (정렬 `O(n log n)` + 투포인터 `O(n^2)`)
* 공간복잡도 : `O(1)` (정렬 이후 추가 배열 거의 없음)

---

## 🧠 사고 키워드

* 0에 가장 가까운 합
* 절댓값 최소화
* 고정점 + 투포인터
* 정렬 기반 포인터 이동

---

## 🔍 트리거 문장

* "세 개의 서로 다른 용액"
* "합이 0에 가장 가까운"
* "정렬 후 양끝 포인터"

---

## ⚠️ 오답 포인트

* 연속 구간(구간합) 문제로 오해하면 접근이 꼬인다.
* 정렬 없이 포인터를 움직이면 방향성이 없어 오답이 난다.
* `abs(sum)` 비교가 아니라 `sum` 자체만 비교하면 "0에 가까움"을 정확히 반영하지 못한다.
* `left < right` 조건이 깨지면 같은 원소를 중복 선택할 수 있다.

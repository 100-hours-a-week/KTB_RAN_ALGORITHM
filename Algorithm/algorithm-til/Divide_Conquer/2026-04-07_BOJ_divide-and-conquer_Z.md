## 🧩 문제

* **문제 제목** : Z
* **문제 레벨** : 골드 5
* **문제 유형** : 분할 정복, 재귀
* **문제 제공** : BOJ 1074
* **문제 링크** : https://www.acmicpc.net/problem/1074
* **코드 파일 (Python)** : [z-1074.py](../../algorithm-Python/Divide_Conquer/z-1074.py)

---

## 🧩 문제 설명

크기가 `2^N x 2^N`인 배열을 Z 모양 순서로 방문할 때,  
좌표 `(r, c)`가 몇 번째로 방문되는지를 구하는 문제이다.

---

## 🧩 문제 핵심 포인트

* 배열을 실제로 만들고 순회하면 비효율적이다.
* 현재 범위를 4등분했을 때 `(r, c)`가 속한 사분면만 재귀로 내려가면 된다.
* 선택한 사분면 이전에 지나간 칸 수를 `size^2` 단위로 누적하면 방문 순서를 계산할 수 있다.

---

## 🧩 내 풀이 방식

* 현재 탐색 범위를 `(startX, endX, startY, endY)`로 관리한다.
* 중간점 `(midX, midY)`를 구해 `(r, c)`의 사분면을 판단한다.
* 사분면 순서(좌상, 우상, 좌하, 우하)에 따라 `0, 1, 2, 3`배의 `size^2`를 더한다.
* `1x1` 크기가 되면 더할 값 없이 `0`을 반환하고, 누적합이 답이 된다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. n, r, c를 입력받아 전체 범위를 [0, 2^n)으로 설정한다.
2. funZ(startX, endX, startY, endY)를 호출한다.
3. 현재 범위를 4등분하고 (r, c)가 속한 사분면을 찾는다.
4. 해당 사분면 이전 칸 수(size^2 * 사분면 인덱스)를 누적한다.
5. 선택된 사분면 범위로 재귀를 반복한다.
6. 1x1에 도달하면 0을 반환하고 누적값을 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```python
import sys

sys.stdin = open("../예제.txt")
input = sys.stdin.readline

n, r, c = map(int, input().split(" "))
# 목표 좌표: r(행), c(열)

# 전체 배열 크기: 2^n x 2^n
sizeXN = 2**n
sizeYN = 2**n

startX = 0;
startY = 0;
endX = sizeXN;
endY = sizeYN;


# 핵심 아이디어
# 1) Z 순서대로 배열을 직접 만들면 비효율적이다.
# 2) 현재 범위를 4등분해서 (r, c)가 속한 사분면만 재귀 탐색한다.
# 3) 선택한 사분면 이전에 지나간 칸 수(size*size)를 누적한다.
def funZ(startX, endX, startY, endY):
    # 현재 범위를 4등분하기 위한 중간 좌표
    midX = (startX + endX) // 2
    midY = (startY + endY) // 2
    size = midX - startX

    # 종료 조건: 1x1 칸까지 내려오면 추가 이동 수는 0
    if startX + 1 == endX and startY + 1 == endY:
        return 0;

    # Z 순서: 좌상 -> 우상 -> 좌하 -> 우하
    if c < midX and r < midY:  # 좌상
        return funZ(startX, midX, startY, midY)
    elif c >= midX and r < midY:  # 우상
        return size * size + funZ(midX, endX, startY, midY)
    elif c < midX and r >= midY:  # 좌하
        return size * size * 2 + funZ(startX, midX, midY, endY)
    elif c >= midX and r >= midY:  # 우하
        return size * size * 3 + funZ(midX, endX, midY, endY)


print(funZ(startX, endX, startY, endY))
```

---

## 🧩 사용된 Python 개념

* 재귀 함수 : 분할된 한 사분면만 계속 탐색
* 정수 나눗셈(`//`) : 중간 좌표 계산
* 누적 반환값 : 사분면별 선행 방문 칸 수 합산

---

## 🧩 복잡도

* 시간복잡도 : `O(N)` (재귀 깊이 `N`, 각 단계 연산 `O(1)`)
* 공간복잡도 : `O(N)` (재귀 호출 스택)

---

## 🧠 사고 키워드

* Z-order
* 사분면 인덱싱
* 분할 정복
* 좌표 기반 누적 계산

---

## 🔍 트리거 문장

* "`2^N x 2^N` 배열"
* "`Z` 모양 순서"
* "`(r, c)`가 몇 번째 방문인지"

---

## ⚠️ 오답 포인트

* `r(행), c(열)`과 `x, y` 축 비교를 뒤집으면 사분면 판정이 틀린다.
* 사분면별 선행 칸 수를 `size^2`가 아닌 현재 전체 넓이로 더하면 값이 커진다.
* 종료 조건을 `1x1`로 두지 않으면 무한 재귀나 오프바이원 오류가 발생한다.

## 🧩 문제

* **문제 제목** : N과 M (5)
* **문제 레벨** : 실버 3
* **문제 유형** : 백트래킹, DFS, 순열
* **문제 제공** : BOJ 15654
* **문제 링크** : https://www.acmicpc.net/problem/15654
* **코드 파일 (Python)** : [n-and-m-5-15654.py](../../algorithm-Python/Search_Graph/n-and-m-5-15654.py)

---

## 🧩 문제 설명

서로 다른 `N`개의 자연수 중에서 `M`개를 고른 수열을 모두 출력하는 문제이다.  
같은 수를 한 수열에서 두 번 쓰면 안 되고, 결과는 사전순으로 출력해야 한다.

---

## 🧩 문제 핵심 포인트

* 길이 `M` 수열을 만드는 전형적인 백트래킹(순열) 문제다.
* 한 수열 안에서는 중복 선택이 불가능하므로 방문 체크가 필요하다.
* 입력 배열 `arr` 자체가 정렬되어 있지 않을 수 있어, 이 풀이에서는 `answer.sort()`로 최종 출력 순서를 맞춘다.

---

## 🧩 내 풀이 방식

* `current`에 현재 선택한 수열을 저장한다.
* `depth == M`이면 완성된 수열이므로 `current.copy()`를 `answer`에 저장한다.
* 매 depth에서 `arr` 전체를 순회하고, 이미 `current`에 있는 값은 건너뛴다.
* `append -> 재귀 -> pop`으로 상태를 복구하면서 모든 경우를 탐색한다.
* 탐색이 끝나면 `answer.sort()` 후 줄바꿈 출력한다.

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, M과 숫자 배열 arr를 입력받는다.
2. backdfs(0)으로 탐색을 시작한다.
3. depth == M이면 current 복사본을 answer에 저장한다.
4. arr를 순회하면서:
   - 이미 current에 있으면 skip
   - append -> backdfs(depth+1) -> pop
5. answer를 정렬한 뒤 문자열로 변환해 출력한다.
```

---

## 🧩 코드 구현 (내 풀이)

```python
import sys

sys.stdin = open("../예제.txt")

input = sys.stdin.readline

#N개의 자연수 중에서 M개를 고른 수열
#수열은 사전 순으로 증가해야한다. -> 마지막에 정렬해도되나?

#depth 기준으로 하기 때문에 갯수는 depth로 파악하기 depth => M


N,M = map(int,input().split(" "))
arr = list(map(int, input().split(" ")))

answer = [];
current = [];

def backdfs(depth):
    if depth == M :
        answer.append(current.copy());
        return
        
    for d in arr :  #arr : 2,4,5
        if d in current : continue
        current.append(d)
        backdfs(depth+1)
        current.pop();
        
#원래 depth는 for 반복문으로 많이 표현했었는데, 백트래킹은 반복문이 아닌 depth는 재귀에게 역할을 맡긴다.
#코테는 각 요소의 역할을 누가 대체하느냐에 따라 구현이 다른것같다. 
        
backdfs(0)
answer.sort()
print("\n".join(" ".join(map(str,i)) for i in answer))
```

---

## 🧩 사용된 Python 개념

* `list.copy()` : 결과 저장 시 참조 분리
* `in` 연산자 : 현재 수열 내 중복 선택 검사
* `append`, `pop` : 선택/복구를 통한 백트래킹 상태 관리
* `list.sort()` : 최종 사전순 정렬
* `"\n".join(...)` : 문제 출력 형식으로 변환

---

## 🧩 복잡도

* 시간복잡도 : `K = P(N, M)`일 때, 생성 과정 `O(K * N * M)` + 정렬 `O(K log K * M)`
* 공간복잡도 : `O(K * M)` (`answer` 저장, 재귀 스택/`current` 제외 시)

---

## 🧠 사고 키워드

* 백트래킹
* 순열 생성
* depth 기반 재귀
* 선택-탐색-복구

---

## 🔍 트리거 문장

* "N개의 자연수 중에서 M개를 고른 수열"
* "중복 없이"
* "사전 순으로 출력"

---

## ⚠️ 오답 포인트

* `answer.append(current)`로 저장하면 참조가 공유되어 결과가 깨진다.
* `current.pop()`을 빼먹으면 이전 선택이 다음 분기에 남아 오답이 된다.
* 입력 수가 정렬되지 않은 경우 출력 순서 보정(`answer.sort()` 또는 `arr.sort()` 기반 탐색)이 없으면 순서 오답이 날 수 있다.

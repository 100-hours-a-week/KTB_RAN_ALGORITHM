## 🧩 문제

* **문제 제목** : 색종이 만들기
* **문제 레벨** : 실버 2
* **문제 유형** : 분할 정복, 재귀
* **문제 제공** : BOJ 2630
* **문제 링크** : https://www.acmicpc.net/problem/2630
* **코드 파일** : [color-paper-2630.js](../../algorithm-JS/Divide_Conquer/color-paper-2630.js)

---

## 🧩 문제 설명

`N x N` 종이가 주어지고, 각 칸은 `0(흰색)` 또는 `1(파란색)`이다.  
현재 정사각형이 한 색으로만 이루어져 있으면 그대로 카운트하고, 섞여 있으면 4등분해서 같은 과정을 반복한다.  
최종적으로 흰색 색종이 수와 파란색 색종이 수를 출력하는 문제이다.

---

## 🧩 문제 핵심 포인트

* 한 번에 전체를 풀려고 하지 않고, **현재 정사각형이 단일 색인지** 먼저 확인한다.
* 단일 색이 아니면 **4개의 같은 크기 정사각형으로 분할**한다.
* 이 패턴이 반복되므로 재귀(분할 정복) 구조가 자연스럽다.

---

## 🧩 내 풀이 방식

* `slicePaper(startX, endX, startY, endY, count)`로 현재 범위를 처리한다.
* 범위 내부를 순회하며 시작 색(`paper[startY][startX]`)과 다른 값이 있는지 확인한다.
* 다른 값이 나오면 중간 좌표(`midX`, `midY`)를 계산해 4분면으로 재귀 호출한다.
* 끝까지 같은 색이면 `colorOutCount` 또는 `colorInCount`를 증가시킨다.

---

## 🧩 주석 기반 사고 흐름 정리

네가 코드 주석에 적어둔 핵심을 읽기 쉽게 재배열하면 아래 순서이다.

```txt
1) "모두 같은 색으로 칠해져 있지 않으면 자른다."
2) "받은 한 페이지에 1과 0이 섞여 있는지 확인한다."
3) "섞여 있으면 4분면으로 자른다. (4진 트리처럼 내려감)"
4) "각 분면을 다시 같은 방식으로 탐색한다."
5) "끝까지 섞이지 않으면 그 조각은 완성된 색종이 1장으로 카운트한다."
```

`startX, endX, startY, endY`로 범위를 줄여 가는 방식 그대로 구현되어 있다.

```txt
탐색 -> 섞임 발견 -> 4등분 -> 재탐색
```

---

## 🧩 코드 로직 정리

### 전체 흐름

```txt
1. N, paper 입력
2. slicePaper(0, N, 0, N, count) 호출
3. 현재 범위가 단일 색인지 검사
4. 단일 색이면 colorOutCount / colorInCount 증가
5. 아니면 midX, midY 계산 후 4분할 재귀
6. 최종 카운트 출력
```

### 분할 기준

```txt
slicePaper(startX, endX, startY, endY)
├─ slicePaper(startX, midX, startY, midY)   // 좌상
├─ slicePaper(midX, endX, startY, midY)     // 우상
├─ slicePaper(startX, midX, midY, endY)     // 좌하
└─ slicePaper(midX, endX, midY, endY)       // 우하
```

---

## 🧩 코드 구현 (내 풀이)

```js
const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const N = Number(input[0]);
const paper = input.slice(1).map((i) => i.split(" ").map(Number));

let colorInCount = 0;
let colorOutCount = 0;

//모두 같은 색으로 칠해져 있지 않으면 자르는 함수
function slicePaper(startX, endX, startY, endY, count) {
  //papae가 1인지 확인해야됨.
  //1. 종료 조건
  let color = paper[startY][startX];
  //2. 분할
  //slicePaper가 받은 한페이지에 1이 모두 있는지 확인 => 0이 있을 경우 더 자름
  //하나를 받으면 4분면으로 자른다.
  //몇개로 나눌수있는가 => 한덩이가 4개로 나뉜다. => 4진트리 ㅋㅋ

  //섞여있으면 자른다.
  //1과 0이 섞여있으면

  //조건으로 범위를 줄인다.
  //1. 우선 탐색 함수를 만든다.
  //2. 위에서 탐색함수의 범위를 주어준다.
  //탐색한다.

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      if (paper[y][x] !== color) {
        let midX = Math.floor((startX + endX) / 2);
        let midY = Math.floor((startY + endY) / 2);

        //분할
        //1
        let leftTop = slicePaper(startX, midX, startY, midY, count);
        //2
        let rightTop = slicePaper(midX, endX, startY, midY, count);
        //3
        let leftButtom = slicePaper(startX, midX, midY, endY, count);
        //4
        let rightButtom = slicePaper(midX, endX, midY, endY, count);

        //정복
        return leftTop + rightTop + leftButtom + rightButtom;
      }
      //0을 안만난 경우
    }
  }

  //0만난적없음
  //[0,1,2,3]
  //[0,1,2,3]
  //[0,1,2,3]
  //[0,1,2,3]

  //=> 이렇게 받으면 길이 = 4/2=2 4/2=2
  //=> x=2 y=2
  //다음은 0~1 2~3 = 이걸 받음

  return color === 1 ? colorInCount++ : colorOutCount++;
}

function solution() {
  let count = 0;
  slicePaper(0, N, 0, N, count);

  return [colorOutCount, colorInCount].join("\n");
}

console.log(solution());

//모두 같은 색으로 칠해져있지 않으면 자른다.
//1. 받은 모든 배열이 1인지 확인한다.
//2. 1이 하나라도 아니면 2/N : N=8 -> N = 4 4 4 4
//3. 0 1 2 3 4 5 6 7 => 0-3(N-1) / (N)4-7(N-1) x와 y를 받고
//우선 걍 다 자를수있도록하자.

//

//자를 수 있는 공간이 있다고 생각하자.
//0-3(N-1) / (N)4-7(N-1) x와 y를 받고
//조합해서 배열을 새로 만들기 몇번? 받은거 자르면 4번 나오긴함.
//받은 요소가 1보다 작거나 같거나 / 모든 경우가 1이 나왔을 경우 => 탐색을 DFS로 하라고 함.
//DFS 말고 가장 근본적인 이중for문으로 생각하기
```

---

## 🧩 사용된 JS 개념

* 재귀 함수 : 범위를 4분할해서 반복 처리
* 중첩 반복문 : 현재 범위가 단일 색인지 검사
* `join("\\n")` : 최종 출력 문자열 구성

---

## 🧩 복잡도

* 시간복잡도 : 최악 `O(N^2 log N)`
* 공간복잡도 : 재귀 깊이 `O(log N)`

---

## 🧠 사고 키워드

* 분할 정복
* 영역 단일성 검사
* 4분할 재귀
* 종료 조건 설계

---

## 🔍 트리거 문장

* "모두 같은 색이 아니면 4등분"
* "같은 과정을 반복"
* "흰색/파란색 개수"

---

## ⚠️ 오답 포인트

* 섞였을 때 `return` 없이 계속 진행하면 중복 카운트가 발생한다.
* 분할 좌표 계산이 틀리면 일부 영역이 누락되거나 중복된다.
* 단일 색 판정 전에 카운트를 올리면 오답이 된다.

---

## 📝 회고 KPT

### 🟢 Keep

* 문제 문장에서 반복 규칙을 보고 분할 정복 패턴을 바로 연결했다.
* 단일 색 검사 -> 분할의 흐름을 함수 하나로 일관되게 유지했다.

### 🔴 Problem

* 처음에는 좌표 범위를 `start/end`로 다루다가 경계 처리에서 혼동이 있었다.
* 카운트를 반환값으로 합치려다 전역 카운트와 혼용되어 구조가 복잡해졌다.

### 🟡 Try

* 다음 분할 정복 문제는 먼저 `start/end` 좌표로 범위를 명확히 잡고 시작한다.
* 분할 직후 반드시 `return`하는지 체크리스트에 넣는다.
* 좌표 분할 그림(좌상/우상/좌하/우하)을 먼저 그리고 코딩한다.

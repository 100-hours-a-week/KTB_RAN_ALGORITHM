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

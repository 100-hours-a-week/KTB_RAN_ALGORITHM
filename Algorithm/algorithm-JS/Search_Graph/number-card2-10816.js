const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, N_arr, M, M_arr) {
  //이분탐색
  let leftIndex = 0;
  let rightIndex = N - 1;

  let answer = [];

  N_arr.sort((a, b) => a - b);

  for (let target of M_arr) {
    let leftIndex = 0;
    let rightIndex = N - 1;
    let lowerIndex = N;

    //여기에 처음과 끝을 찾는 upperBound, downBound
    //앞에 찾기
    while (leftIndex <= rightIndex) {
      let mid = Math.floor((leftIndex + rightIndex) / 2);

      //여기에 처음과 끝을 찾는 upperBound, downBound
      if (target <= N_arr[mid]) {
        lowerIndex = mid; //후보 저장
        rightIndex = mid - 1; //더 탐색
      } else {
        leftIndex = mid + 1;
      }
    }

    leftIndex = 0;
    rightIndex = N - 1;
    let upperIndex = N;

    //뒤에 찾기
    while (leftIndex <= rightIndex) {
      let mid = Math.floor((leftIndex + rightIndex) / 2);

      //여기에 처음과 끝을 찾는 upperBound, downBound
      if (target < N_arr[mid]) {
        upperIndex = mid; //후보 저장
        rightIndex = mid - 1; //더 탐색
      } else {
        leftIndex = mid + 1;
      }
    }

    answer.push(upperIndex - lowerIndex);
  }

  return answer.join(" ");
}

const N = Number(input[0]);
const N_arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const M_arr = input[3].split(" ").map(Number);

console.log(solution(N, N_arr, M, M_arr));

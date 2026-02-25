const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(N, A_arr, M, M_arr) {
  //정렬 먼저 : N logN
  A_arr.sort((a, b) => a - b);

  const answer = [];

  //이분탐색 시작

  for (let target of M_arr) {
    let left = 0;
    let right = N - 1;
    while (left <= right) {
      let midIndex = Math.floor((left + right) / 2);

      if (A_arr[midIndex] === target) {
        answer.push(1);
        break;
      } else if (A_arr[midIndex] > target) {
        right = midIndex - 1;
      } else {
        left = midIndex + 1;
      }
    }

    if (left > right) {
      answer.push(0);
    }
  }

  return answer.join("\n");
}

const N = Number(input[0]);
const A_arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const M_arr = input[3].split(" ").map(Number);

console.log(solution(N, A_arr, M, M_arr));

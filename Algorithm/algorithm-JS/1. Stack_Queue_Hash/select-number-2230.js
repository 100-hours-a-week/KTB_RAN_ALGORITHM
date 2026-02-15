const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(M, arr) {
  arr.sort((a, b) => a - b);

  let left = 0;
  let right = 0;
  let answer = Infinity;

  while (right < arr.length && left < arr.length) {
    const diff = arr[right] - arr[left];

    if (diff < M) {
      right += 1;
    } else {
      if (diff < answer) answer = diff;
      left += 1;

      // 같은 원소를 비교하지 않도록 right를 한 칸 밀어 불변식(left < right) 유지
      if (left === right) right += 1;
    }
  }

  return answer;
}

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map(Number);

console.log(solution(M, arr));

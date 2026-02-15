const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(S, arr) {
  let minLen = Infinity;
  let left = 0;
  let right = 0;
  let currentSum = 0;

  while (right < arr.length) {
    currentSum += arr[right];

    while (currentSum >= S) {
      const len = right - left + 1;
      if (len < minLen) minLen = len;

      currentSum -= arr[left];
      left += 1;
    }

    right += 1;
  }

  return minLen === Infinity ? 0 : minLen;
}

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

console.log(solution(S, arr));

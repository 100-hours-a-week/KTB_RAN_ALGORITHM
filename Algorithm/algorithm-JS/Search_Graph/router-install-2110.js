const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function placeCheck(placeArr, mid, c) {
  let installedPos = placeArr[0];
  let count = 1;

  for (let i = 1; i < placeArr.length; i++) {
    const d = placeArr[i] - installedPos;
    if (d >= mid) {
      installedPos = placeArr[i];
      count += 1;
    }
  }

  return count >= c;
}

function solution(n, c, placeArr) {
  placeArr.sort((a, b) => a - b);

  let start = 1;
  let end = placeArr[placeArr.length - 1] - placeArr[0];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (placeCheck(placeArr, mid, c)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return end;
}

const [n, c] = input[0].split(" ").map(Number);
const placeArr = input.slice(1, n + 1).map(Number);

console.log(solution(n, c, placeArr));

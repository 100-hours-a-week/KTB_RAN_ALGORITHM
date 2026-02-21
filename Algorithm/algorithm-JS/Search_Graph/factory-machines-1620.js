const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, speeds) {
  let left = 1n;
  const maxSpeed = speeds.reduce((acc, cur) => (acc > cur ? acc : cur), 0n);
  let right = maxSpeed * n;
  let answer = right;

  while (left <= right) {
    const mid = (left + right) / 2n;

    let total = 0n;
    for (const time of speeds) {
      total += mid / time;
      if (total >= n) break;
    }

    if (total >= n) {
      answer = mid;
      right = mid - 1n;
    } else {
      left = mid + 1n;
    }
  }

  return answer;
}

let n;
let speeds;

const firstLine = input[0].split(" ").map(BigInt);

if (firstLine.length === 2 && input.length >= 2) {
  const machineCount = Number(firstLine[0]);
  n = firstLine[1];
  speeds = input[1].split(" ").slice(0, machineCount).map(BigInt);
} else {
  n = firstLine[0];
  speeds = input[1].split(" ").map(BigInt);
}

console.log(solution(n, speeds).toString());

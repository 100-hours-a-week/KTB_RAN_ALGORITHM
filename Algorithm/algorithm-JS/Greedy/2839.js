const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();

function solution(n) {
  let five = Math.floor(n / 5);

  while (five >= 0) {
    const remain = n - five * 5;
    if (remain % 3 === 0) return five + remain / 3;
    five -= 1;
  }

  return -1;
}

const n = Number(input);
console.log(solution(n));

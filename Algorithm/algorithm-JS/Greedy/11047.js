const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, money, kindOfMoney) {
  let count = 0;

  for (let i = n - 1; i >= 0; i--) {
    if (money >= kindOfMoney[i]) {
      const currentCount = Math.floor(money / kindOfMoney[i]);
      count += currentCount;
      money -= kindOfMoney[i] * currentCount;
    }
  }

  return count;
}

const [n, money] = input[0].split(" ").map(Number);
const kindOfMoney = input.slice(1, n + 1).map(Number);

console.log(solution(n, money, kindOfMoney));

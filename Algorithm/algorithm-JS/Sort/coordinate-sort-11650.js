const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, arr) {
  const dots = [];

  for (const a of arr) {
    const [x, y] = a.split(" ").map(Number);
    dots.push({ x, y });
  }

  dots.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  return dots.map((dot) => `${dot.x} ${dot.y}`).join("\n");
}

const n = Number(input[0]);
const arr = input.slice(1, n + 1);

console.log(solution(n, arr));

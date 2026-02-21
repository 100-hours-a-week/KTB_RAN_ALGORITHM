const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, arr) {
  const members = [];

  for (const e of arr) {
    const [age, name] = e.split(" ");
    members.push({ age: Number(age), name });
  }

  members.sort((a, b) => a.age - b.age);

  return members.map((m) => `${m.age} ${m.name}`).join("\n");
}

const n = Number(input[0]);
const arr = input.slice(1, n + 1);

console.log(solution(n, arr));

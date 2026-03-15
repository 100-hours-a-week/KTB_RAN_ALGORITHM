const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

// 백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function binarySearch(cards, target) {
  let left = 0;
  let right = cards.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (cards[mid] === target) return 1;
    if (cards[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return 0;
}

function solution(n, cards, m, queries) {
  cards.sort((a, b) => a - b);

  const answer = [];
  for (const query of queries) {
    answer.push(binarySearch(cards, query));
  }

  return answer.join(" ");
}

const n = Number(input[0]);
const cards = input[1].split(" ").map(Number);

const m = Number(input[2]);
const queries = input[3].split(" ").map(Number);

console.log(solution(n, cards, m, queries));

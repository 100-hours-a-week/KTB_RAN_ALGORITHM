//1. dp 정의
// dp[i] = i를 1로 만드는 연산 사용횟수 최솟값

//2. i번째에 내가 할수있는 선택.
// 1. X가 3으로 나누어 떨어지면 3을 나눈다.
// 2. X가 2로 나누어 떨어지면 2를 나눈다.
// 3. X에서 -1를 뺀다

//4 -> %2 %2 | -1 %3
//d[0] return 0
//d[4] = d[3] + 1(-1) | d[i-1] + 1
//d[2] = d[2] + 1(%2) | d[i%2] + 1
//3으로 못나눔 | d[i%3] + 1

//dp[i] = Math.min(i%2?d[i%2]+1, i%3?d[i%3]+1, d[i-1]+1);

const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n) {
  const dp = Array(n + 1).fill(n);

  if (n == 0) return 0;
  if (n == 1) return 0;

  dp[0] = 0;
  dp[1] = dp[0];

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(
      i % 2 === 0 ? dp[i / 2] + 1 : n,
      i % 3 === 0 ? dp[i / 3] + 1 : n,
      dp[i - 1] + 1
    );
  }

  return dp[n];
}

const n = Number(input[0]);

console.log(solution(n));

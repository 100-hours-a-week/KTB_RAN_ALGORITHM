const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

// 백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const dp = Array(n + 1).fill(false);

// dp[i]: 돌이 i개 남았을 때 현재 턴 플레이어가 이길 수 있으면 true
dp[1] = true;
if (n >= 2) dp[2] = false;
if (n >= 3) dp[3] = true;

for (let i = 4; i <= n; i++) {
  dp[i] = !dp[i - 1] || !dp[i - 3];
}

console.log(dp[n] ? "SK" : "CY");

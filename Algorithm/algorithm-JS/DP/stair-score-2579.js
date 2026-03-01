//계단오르기 문제
// 계단 오르는 데는 다음과 같은 규칙이 있다.
// 1) 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다.
// 2) 연속된 세 개의 계단을 모두 밟아서는 안 된다.
// 3) 마지막 도착 계단은 반드시 밟아야 한다.
//
// d[i] = i번째 계단을 "반드시 밟고" 도달했을 때 얻을 수 있는 최대 점수
// 점화식(1-based):
// d[i] = Math.max(d[i-2], d[i-3] + stair[i-1]) + stair[i]

const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n, arr) {
  if (n === 1) return arr[0];
  if (n === 2) return arr[0] + arr[1];

  // 1-based 인덱스로 변환
  const stair = [0, ...arr];
  const dp = Array(n + 1).fill(0);

  dp[1] = stair[1];
  dp[2] = stair[1] + stair[2];
  dp[3] = Math.max(stair[1] + stair[3], stair[2] + stair[3]);

  for (let i = 4; i <= n; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3] + stair[i - 1]) + stair[i];
  }

  return dp[n];
}

const n = Number(input[0]);
const arr = input.slice(1).map(Number);

console.log(solution(n, arr));

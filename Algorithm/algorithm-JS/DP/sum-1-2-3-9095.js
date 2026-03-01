// 정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.
//
// 1+1+1+1
// 1+1+2
// 1+2+1
// 2+1+1
// 2+2
// 1+3
// 3+1
// 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
//1, 2, 3의 합
//
//1. dp의 정의
//dp[i] = i를 만들 수 있는 방법의 수
//
//2. i번째에 내가 할 수 있는 선택
//현재 dp만 생각하기
//마지막에 1,2,3을 붙여 i를 만드는 경우
//
//점화식
//dp[i] = dp[i-1] + dp[i-2] + dp[i-3]

const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

function solution(n) {
  const dp = Array(n + 1).fill(0);

  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 4;

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= n; i++) {
    for (let j = 1; j <= 3; j++) {
      dp[i] += dp[i - j];
    }
  }
  return dp[n];
}

const n = input.slice(1).map(Number);

for (const i of n) {
  console.log(solution(i));
}

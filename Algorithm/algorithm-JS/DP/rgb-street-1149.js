// RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다.

// 집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다.
// 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

// 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
// N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
// i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.

//1. DP 정의하기 : i가 ()였을때 집 칠하는 비용의 최솟값

//dp[][0] = 빨강 dp[][1] = 초록 dp[][2] = 파랑
//2. i번째 내가 할수있는 선택
//dp[i][0] = i번째 집을 빨강으로 칠했을때 최소비용 => dist의 역할을 함.
//최솟값이니까 min이겠군아.
//dp[i][1] = i번째 집을 초록으로 칠했을때 최소비용

//DP 매일 풀어야할 것같음. 매일 한문제
//3. 이전의 상태
//DP[i-1] = 파랑이었을경우
//1. DP[i][0] = Math.min(DP[i-1][1],DP[i-1][2]) + 현재빨강
//2. DP[i] = Math.min(DP[i-1][0],DP[i-1][1]) + 현재파랑
//3. DP[i] = Math.min(DP[i-1][0],DP[i-1][2]) + 현재초록
//DP[i] == DP[i-1]가 선택한 값만 아니면돼

//인사이트 : 최솟값을 구할때는 과거 + 현재 구조이다.

const fs = require("fs"); // /dev/stdin
const input = fs.readFileSync("../예제.txt").toString().trim().split("\n");

//백준 제출 시
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const colorArr = input.slice(1).map((i) => i.split(" ").map(Number));

function solution() {
  const dp = Array.from({ length: n }, () => Array(3).fill(0));

  //작은 문제로 큰문제를 푼다.
  dp[0][0] = colorArr[0][0];
  dp[0][1] = colorArr[0][1];
  dp[0][2] = colorArr[0][2];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + colorArr[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + colorArr[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + colorArr[i][2];
  }

  return Math.min(...dp[n - 1]);
}

console.log(solution());

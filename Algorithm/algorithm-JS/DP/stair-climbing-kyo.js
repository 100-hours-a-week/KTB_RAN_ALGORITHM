function solution(n) {
  //n = 4
  //1 1 1 1 | 1 1 2 | 1 2 1 | 2 1 1 | 2 2
  //계단 오르기 서로 다른 경우의 수

  //n개까지 가는 방법을 알기 위해
  //n-1에서 한 칸 오르기
  //n-2에서 두 칸 오르기

  //1. 점화식을 작성하기
  //dp[i] = i번째 계단까지 올라가는 방법의 수
  //dp[i] = dp[i-1] + dp[i-2]

  //2. 작은 문제를 풀어놓기
  //dp[1] = 1
  //dp[2] = 2
  //2층 계단을 오를 때 [1+1], [2] -> 2가지

  //Bottom-up
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(solution(4)); // 5
console.log(solution(5)); // 8

function solution(money) {
  //도둑의 최적 전략
  //점화식을 만드는 방법
  //dp[i] => i번째 집까지 생각했을 때, 도둑이 훔칠 수 있는 최대 금액

  //1. i번째 집을 털지 않는다.
  //-> dp[i-1]
  //2. i번째 집을 턴다.
  //연속된 두 집을 동시에 털 수 없기 때문
  //-> dp[i-2] + money[i]

  //점화식
  //dp[i] = Math.max(dp[i-1], dp[i-2] + money[i])

  const n = money.length;
  if (n === 0) return 0;
  if (n === 1) return money[0];

  //dp[i] = 0..i번째 집까지 고려했을 때 훔칠 수 있는 최대 금액
  const dp = Array(n).fill(0);

  //기저값
  dp[0] = money[0];
  dp[1] = Math.max(money[0], money[1]);

  for (let i = 2; i < n; i++) {
    //i번째 집을 털지 않는 경우 vs 터는 경우
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + money[i]);
  }

  return dp[n - 1];
}

console.log(solution([2, 7, 9, 3, 1])); // 12
console.log(solution([1, 2, 3, 1])); // 4
console.log(solution([5, 1, 1, 5])); // 10

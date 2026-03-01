function solution(coins, amount) {
  //금액 X
  //dp[x] = x를 만들기 위해 필요한 최소 동전의 개수
  //마지막에 선택한 동전 coin
  //x = (x-coin) + coin(이번에 선택한 코인)

  //dp[x] = Math.min(dp[x], dp[x-coin] + 1)

  //[1,3,4] => 6을 만들기
  //dp[6] = dp[5] + 1 (coin=1)
  //dp[6] = dp[3] + 1 (coin=3)
  //dp[6] = dp[2] + 1 (coin=4)

  //dp[x] = 금액 x를 만들기 위한 최소 동전 개수
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let target = 1; target <= amount; target++) {
    for (const coin of coins) {
      if (target - coin >= 0) {
        dp[target] = Math.min(dp[target], dp[target - coin] + 1);
      }
    }
  }

  //끝까지 초기값이면 amount를 만들 수 없는 경우
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}

console.log(solution([1, 2, 5], 11)); // 3
console.log(solution([2], 3)); // -1
console.log(solution([1], 0)); // 0

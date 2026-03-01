function solution(meats) {
  //dp[i] => i번째 부스까지 고려했을 때 먹을 수 있는 최대 고기의 양

  //i번째 부스까지 고려할 때, 3가지 경우
  //1. i번째 부스를 먹지 않는 경우
  //-> dp[i-1]
  //2. i번째 부스를 먹고, i-1번째 부스는 먹지 않는 경우
  //-> dp[i-2] + meats[i]
  //3. i번째 부스를 먹고, i-1번째 부스를 먹고, i-2번째 부스는 먹지 않는 경우
  //-> dp[i-3] + meats[i-1] + meats[i]

  //dp[i] = Math.max(dp[i-1], dp[i-2]+meats[i], dp[i-3]+meats[i-1]+meats[i])

  const n = meats.length;

  if (n === 0) return 0;
  if (n === 1) return meats[0];
  if (n === 2) return meats[0] + meats[1];

  //dp[i] = 0..i번째 부스까지 고려했을 때 먹을 수 있는 최대 고기 양
  const dp = Array(n).fill(0);

  dp[0] = meats[0];
  dp[1] = meats[0] + meats[1];
  dp[2] = Math.max(dp[1], meats[0] + meats[2], meats[1] + meats[2]);

  for (let i = 3; i < n; i++) {
    //연속 3개를 먹지 않도록 3개 케이스를 비교
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + meats[i],
      dp[i - 3] + meats[i - 1] + meats[i]
    );
  }

  return dp[n - 1];
}

console.log(solution([6, 10, 13, 9, 8, 1])); // 33
console.log(solution([1, 2, 3, 4, 5])); // 12

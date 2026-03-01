function solution(arr) {
  // dp[i] = i번째 원소를 "반드시 포함"하는 LIS 길이
  // 초기값 1: 자기 자신만 선택하는 부분수열은 항상 가능
  const n = arr.length;
  const dp = Array(n).fill(1);

  // target 위치를 끝으로 하는 LIS를 왼쪽 원소들(j)로 확장
  for (let target = 1; target < n; target++) {
    for (let j = 0; j < target; j++) {
      // 증가 조건을 만족하면, 더 긴 길이로 갱신
      if (arr[j] < arr[target]) {
        dp[target] = Math.max(dp[target], dp[j] + 1);
      }
    }
  }

  // 전체 LIS는 각 위치를 끝으로 하는 값들 중 최대
  return Math.max(...dp);
}

console.log(solution([10, 20, 10, 30, 20, 50])); // 4
console.log(solution([3, 10, 2, 1, 20])); // 3

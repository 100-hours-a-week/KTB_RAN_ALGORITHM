function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n;
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let total = 0;
    for (const time of times) {
      total += Math.floor(mid / time);
    }

    if (total >= n) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

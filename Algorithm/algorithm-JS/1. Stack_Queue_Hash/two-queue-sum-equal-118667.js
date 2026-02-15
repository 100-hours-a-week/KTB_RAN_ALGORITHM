function solution(queue1, queue2) {
  const n = queue1.length;
  const sum1 = queue1.reduce((acc, cur) => acc + cur, 0);
  const sum2 = queue2.reduce((acc, cur) => acc + cur, 0);

  const total = sum1 + sum2;
  if (total % 2 !== 0) return -1;

  const target = total / 2;
  const arr = [...queue1, ...queue2];
  const m = arr.length;

  let left = 0;
  let right = n - 1;
  let current = sum1;

  const limit = n * 3;

  for (let count = 0; count <= limit; count++) {
    if (current === target) return count;

    if (current > target) {
      current -= arr[left % m];
      left += 1;
    } else {
      right += 1;
      current += arr[right % m];
    }
  }

  return -1;
}

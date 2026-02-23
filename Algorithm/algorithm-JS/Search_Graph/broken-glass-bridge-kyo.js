function checkGlass(glass, mid, k) {
  let brokenCount = 0;

  for (let i = 0; i < glass.length; i++) {
    if (glass[i] <= mid) {
      brokenCount += 1;
    } else {
      brokenCount = 0;
    }

    if (brokenCount >= k) {
      return false;
    }
  }

  return true;
}

function solution(glass, k) {
  let start = 1;
  let end = 200000000;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (checkGlass(glass, mid, k)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

console.log(solution([5, 3, 1, 2, 1, 3, 5], 3));
console.log(solution([4, 2, 2, 1, 4], 2));

function solution(m, v) {
  // m: 직원별 최소 기대 만족도
  // v: 선물 가치
  m.sort((a, b) => a - b);
  v.sort((a, b) => a - b);

  let satisfiedCount = 0; // 만족한 직원 수
  let i = 0; // 직원 포인터
  let j = 0; // 선물 포인터

  while (i < m.length && j < v.length) {
    if (v[j] >= m[i]) {
      // 현재 직원을 만족시키는 가장 작은 선물 매칭
      satisfiedCount += 1;
      i += 1;
      j += 1;
    } else {
      // 선물 가치가 부족하면 더 큰 선물로 이동
      j += 1;
    }
  }

  return satisfiedCount;
}

console.log(solution([2, 4, 6, 8, 10], [1, 3, 5, 7, 9, 11])); // 5
console.log(solution([5, 10, 15], [5, 5])); // 1
console.log(solution([2, 4], [1, 2, 3])); // 1

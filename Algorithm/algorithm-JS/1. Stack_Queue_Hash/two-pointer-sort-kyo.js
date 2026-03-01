function solution(weights, limit) {
  // 1) 몸무게를 오름차순 정렬
  // 2) 가장 가벼운 사람(left) + 가장 무거운 사람(right)을 함께 태울 수 있으면 left++
  // 3) 무거운 사람(right)은 항상 이번 보트에 탑승하므로 right--
  // 4) 보트 수(truck) 증가
  weights.sort((a, b) => a - b);

  let left = 0;
  let right = weights.length - 1;
  let truck = 0;

  while (left <= right) {
    if (weights[left] + weights[right] <= limit) {
      left += 1;
    }
    right -= 1;
    truck += 1;
  }

  return truck;
}

console.log(solution([40, 50], 90)); // 1
console.log(solution([70, 50, 50, 30], 100)); // 2

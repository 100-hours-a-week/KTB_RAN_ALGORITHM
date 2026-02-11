function solution(prices) {
  // 기준: 하나의 주식을 기준으로 뒤 구간을 확인
  // 가격이 떨어지지 않은 기간(초)을 계산
  let count = 0;
  const answer = [];

  for (let i = 0; i < prices.length; i++) {
    for (let idx = i; idx < prices.length; idx++) {
      if (idx === i) continue;
      count++;

      if (prices[i] > prices[idx]) {
        break;
      }
    }
    answer.push(count);
    count = 0;
  }

  return answer;
}


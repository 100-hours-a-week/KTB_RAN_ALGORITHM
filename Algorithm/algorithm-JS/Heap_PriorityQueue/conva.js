class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[currentIndex]) break;

      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    const length = this.heap.length;
    let currentIndex = 0;

    while (true) {
      let minIndex = currentIndex;
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[minIndex]
      ) {
        minIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[minIndex]
      ) {
        minIndex = rightChildIndex;
      }

      if (minIndex === currentIndex) break;

      this.swap(currentIndex, minIndex);
      currentIndex = minIndex;
    }
  }
}

function solution(T, R, times) {
  const minHeap = new MinHeap();
  let usedTime = 0;
  let count = 0;

  for (const time of times) {
    minHeap.insert(time);

    // 자동 처리 모드는 "가장 큰 R개"에 쓰는 것이 최적
    // 따라서 힙 크기가 R을 넘으면 가장 작은 값을 실제 작업 시간에 더한다.
    if (minHeap.size() > R) {
      usedTime += minHeap.extractMin();
    }

    if (usedTime > T) break;
    count += 1;
  }

  return count;
}

console.log(solution(12, 2, [6, 3, 5, 8, 2, 4]))
console.log(solution(5, 3, [10, 20, 30]))

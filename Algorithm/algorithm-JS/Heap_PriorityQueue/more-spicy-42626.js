class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap.length ? this.heap[0] : null;
  }

  insert(value) {
    const heap = this.heap;
    heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    const heap = this.heap;

    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    const min = heap[0];
    heap[0] = heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    const heap = this.heap;
    let currentIndex = heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = (currentIndex - 1) >> 1;
      if (heap[parentIndex] <= heap[currentIndex]) break;

      const temp = heap[parentIndex];
      heap[parentIndex] = heap[currentIndex];
      heap[currentIndex] = temp;

      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    const heap = this.heap;
    const length = heap.length;
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let minIndex = currentIndex;

      if (leftChildIndex < length && heap[leftChildIndex] < heap[minIndex]) {
        minIndex = leftChildIndex;
      }

      if (rightChildIndex < length && heap[rightChildIndex] < heap[minIndex]) {
        minIndex = rightChildIndex;
      }

      if (minIndex === currentIndex) break;

      const temp = heap[minIndex];
      heap[minIndex] = heap[currentIndex];
      heap[currentIndex] = temp;
      currentIndex = minIndex;
    }
  }
}

function solution(scoville, K) {
  const minHeap = new MinHeap();

  for (const value of scoville) {
    minHeap.insert(value);
  }

  let count = 0;

  while (minHeap.size() > 1 && minHeap.peek() < K) {
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();
    minHeap.insert(first + second * 2);
    count += 1;
  }

  return minHeap.peek() !== null && minHeap.peek() >= K ? count : -1;
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n").map(Number);

class MaxHeap {
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

  extractMax() {
    const heap = this.heap;
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    const max = heap[0];
    heap[0] = heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyUp() {
    const heap = this.heap;
    let currentIndex = heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (heap[parentIndex] >= heap[currentIndex]) break;

      const tmp = heap[parentIndex];
      heap[parentIndex] = heap[currentIndex];
      heap[currentIndex] = tmp;
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    const heap = this.heap;
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;
      let maxIndex = currentIndex;

      if (leftChildIndex < heap.length && heap[leftChildIndex] > heap[maxIndex]) {
        maxIndex = leftChildIndex;
      }
      if (rightChildIndex < heap.length && heap[rightChildIndex] > heap[maxIndex]) {
        maxIndex = rightChildIndex;
      }

      if (maxIndex === currentIndex) break;

      const tmp = heap[maxIndex];
      heap[maxIndex] = heap[currentIndex];
      heap[currentIndex] = tmp;
      currentIndex = maxIndex;
    }
  }
}

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
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (heap[parentIndex] <= heap[currentIndex]) break;

      const tmp = heap[parentIndex];
      heap[parentIndex] = heap[currentIndex];
      heap[currentIndex] = tmp;
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    const heap = this.heap;
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;
      let minIndex = currentIndex;

      if (leftChildIndex < heap.length && heap[leftChildIndex] < heap[minIndex]) {
        minIndex = leftChildIndex;
      }
      if (rightChildIndex < heap.length && heap[rightChildIndex] < heap[minIndex]) {
        minIndex = rightChildIndex;
      }

      if (minIndex === currentIndex) break;

      const tmp = heap[minIndex];
      heap[minIndex] = heap[currentIndex];
      heap[currentIndex] = tmp;
      currentIndex = minIndex;
    }
  }
}

function solution(n, arr) {
  const maxHeap = new MaxHeap(); // lower half
  const minHeap = new MinHeap(); // upper half
  const answer = [];

  for (const x of arr) {
    if (maxHeap.size() === 0 || x <= maxHeap.peek()) maxHeap.insert(x);
    else minHeap.insert(x);

    if (maxHeap.size() < minHeap.size()) {
      maxHeap.insert(minHeap.extractMin());
    }
    if (maxHeap.size() > minHeap.size() + 1) {
      minHeap.insert(maxHeap.extractMax());
    }

    if (minHeap.size() > 0 && maxHeap.peek() > minHeap.peek()) {
      const a = maxHeap.extractMax();
      const b = minHeap.extractMin();
      maxHeap.insert(b);
      minHeap.insert(a);
    }

    answer.push(maxHeap.peek());
  }

  return answer;
}

const n = input[0];
const arr = input.slice(1, n + 1);
console.log(solution(n, arr).join("\n"));

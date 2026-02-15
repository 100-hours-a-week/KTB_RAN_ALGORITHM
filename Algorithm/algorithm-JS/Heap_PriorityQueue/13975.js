const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  build(arr) {
    this.heap = arr.slice();
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.heapifyDownFrom(i);
    }
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
    this.heapifyDownFrom(0);
  }

  heapifyDownFrom(startIndex) {
    const heap = this.heap;
    const length = heap.length;
    let currentIndex = startIndex;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;
      let minIndex = currentIndex;

      if (leftChildIndex < length && heap[leftChildIndex] < heap[minIndex]) {
        minIndex = leftChildIndex;
      }
      if (rightChildIndex < length && heap[rightChildIndex] < heap[minIndex]) {
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

function solveCase(files) {
  if (files.length <= 1) return 0;

  const minHeap = new MinHeap();
  minHeap.build(files);

  let total = 0;

  while (minHeap.size() > 1) {
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();
    const sum = first + second;

    total += sum;
    minHeap.insert(sum);
  }

  return total;
}

let idx = 0;
const t = input[idx++];
const answer = [];

for (let tc = 0; tc < t; tc++) {
  const k = input[idx++];
  const files = input.slice(idx, idx + k);
  idx += k;
  answer.push(solveCase(files));
}

console.log(answer.join("\n"));

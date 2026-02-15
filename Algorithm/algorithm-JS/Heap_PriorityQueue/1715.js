const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
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

      const swap = heap[parentIndex];
      heap[parentIndex] = heap[currentIndex];
      heap[currentIndex] = swap;
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

      if (
        leftChildIndex < heap.length &&
        heap[leftChildIndex] < heap[minIndex]
      ) {
        minIndex = leftChildIndex;
      }
      if (
        rightChildIndex < heap.length &&
        heap[rightChildIndex] < heap[minIndex]
      ) {
        minIndex = rightChildIndex;
      }

      if (minIndex === currentIndex) break;

      const swap = heap[minIndex];
      heap[minIndex] = heap[currentIndex];
      heap[currentIndex] = swap;
      currentIndex = minIndex;
    }
  }
}

function solution(n, cards) {
  if (n <= 1) return 0;

  const minHeap = new MinHeap();
  let total = 0;

  for (const card of cards) {
    minHeap.insert(card);
  }

  while (minHeap.size() > 1) {
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();
    const sum = first + second;

    total += sum;
    minHeap.insert(sum);
  }

  return total;
}

const n = Number(input[0]);
const cards = input.slice(1).map(Number);
console.log(solution(n, cards));

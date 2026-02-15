const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

class AbsMinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  compare(a, b) {
    if (Math.abs(a) === Math.abs(b)) return a - b;
    return Math.abs(a) - Math.abs(b);
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
      if (this.compare(heap[parentIndex], heap[currentIndex]) <= 0) break;

      const temp = heap[parentIndex];
      heap[parentIndex] = heap[currentIndex];
      heap[currentIndex] = temp;
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
        this.compare(heap[leftChildIndex], heap[minIndex]) < 0
      ) {
        minIndex = leftChildIndex;
      }
      if (
        rightChildIndex < heap.length &&
        this.compare(heap[rightChildIndex], heap[minIndex]) < 0
      ) {
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

function solution(n, arr) {
  const heap = new AbsMinHeap();
  const answer = [];

  for (const x of arr) {
    if (x === 0) {
      if (heap.size() === 0) answer.push(0);
      else answer.push(heap.extractMin());
    } else {
      heap.insert(x);
    }
  }

  return answer;
}

const n = Number(input[0]);
const arr = input.slice(1).map(Number);
console.log(solution(n, arr).join("\n"));

function calculateMinCost() {
  const ropeLengthsInput = document.getElementById("rope-lengths");
  const ropeLengths = ropeLengthsInput.value.split(",").map(Number);

  // Create a min-heap and initialize the cost
  const minHeap = new MinHeap();
  let cost = 0;

  // Insert the rope lengths into the min-heap
  for (let i = 0; i < ropeLengths.length; i++) {
    minHeap.insert(ropeLengths[i]);
  }

  // Connect the ropes until only one rope is left in the min-heap
  while (minHeap.size() > 1) {
    // Remove the two smallest ropes from the min-heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting the two ropes
    const connectCost = rope1 + rope2;

    // Add the connect cost to the total cost
    cost += connectCost;

    // Insert the connected rope length back into the min-heap
    minHeap.insert(connectCost);
  }

  // Display the minimum cost inside the result div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "Minimum cost: " + cost;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return min;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(index, smallestIndex);
      this.heapifyDown(smallestIndex);
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  size() {
    return this.heap.length;
  }
}

// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
class MaxHeap {
  constructor(values) {
    this.heap = [];
    values.forEach(value => this.push(value));
  }

  compareValue(oneIndex, otherIndex) {
    const oneValue = this.heap[oneIndex];
    const otherValue = this.heap[otherIndex];

    if (oneValue.count < otherValue.count) return -1;
    if (oneValue.count > otherValue.count) return 1;

    if (oneValue.name < otherValue.name) return 1;
    if (oneValue.name > otherValue.name) return -1;

    return 0;
  }

  get size() {
    return this.heap.length;
  }

  getParentIndex(index) {
    if (index <= 0) return 0;
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  getMaxChildIndex(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    if (rightChildIndex >= this.heap.length) return leftChildIndex;

    return this.compareValue(leftChildIndex, rightChildIndex) > 0 ? leftChildIndex : rightChildIndex;
  }

  swapValues(oneIndex, otherIndex) {
    const temp = this.heap[oneIndex];
    this.heap[oneIndex] = this.heap[otherIndex];
    this.heap[otherIndex] = temp;
  }

  push(value) {
    this.heap.push(value);

    // Newly added value
    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);

    // Swap values for value & parent until parent > value
    while (parentIndex >= 0 && this.compareValue(index, parentIndex) > 0) {
      this.swapValues(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  pop() {
    // Swap last value with root
    this.swapValues(0, this.heap.length - 1);
    const max = this.heap.pop();

    let index = 0;
    let maxChildIndex = this.getMaxChildIndex(index);

    while (maxChildIndex < this.heap.length && this.compareValue(index, maxChildIndex) < 0) {
      this.swapValues(index, maxChildIndex);
      index = maxChildIndex;
      maxChildIndex = this.getMaxChildIndex(index);
    }

    return max;
  }
}

function popularNToys(numToys, topToys, toys, numQuotes, quotes) {
  // First, iterate through quotes to count & save mentions for each toy
  const mentionsCount = {};

  quotes.forEach(quote => {
    const parts = quote.split(' ').map(part => part.toLowerCase());

    toys.forEach(toy => {
      if (parts.includes(toy)) {
        if (mentionsCount[toy] == null) {
          mentionsCount[toy] = 0;
        }

        mentionsCount[toy] += 1;
      }
    });
  });

  // Now we have a dictionary of { toyName: mentionsCout },
  // to find the top Nth most mentioned ones, using a Max heap

  const mentionsResult = [];

  for (const toyName in mentionsCount) {
    mentionsResult.push({ name: toyName, count: mentionsCount[toyName] });
  }

  const maxHeap = new MaxHeap(mentionsResult);

  // Our final result
  const topToysResult = [];

  while (topToysResult.length < topToys && maxHeap.size > 0) {
    const { name } = maxHeap.pop();
    topToysResult.push(name);
  }

  return topToysResult;
}
// FUNCTION SIGNATURE ENDS

class Heap {
  constructor(values) {
    this.container = [];

    if (values) {
      values.forEach(value => this.push(value));
    }
  }

  compareValue(firstIndex, secondIndex) {
    const first = this.container[firstIndex];
    const second = this.container[secondIndex];

    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  }

  get size() {
    return this.container.length;
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
    if (rightChildIndex >= this.container.length) return leftChildIndex;

    const maxChildIndex = this.compareValue(leftChildIndex, rightChildIndex) > 0 ? leftChildIndex : rightChildIndex;
    return maxChildIndex;
  }

  getMinChildIndex(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    if (rightChildIndex >= this.container.length) return leftChildIndex;

    const minChildIndex = this.compareValue(leftChildIndex, rightChildIndex) < 0 ? leftChildIndex : rightChildIndex;
    return minChildIndex;
  }

  swapValues(firstIndex, secondIndex) {
    const temp = this.container[firstIndex];
    this.container[firstIndex] = this.container[secondIndex];
    this.container[secondIndex] = temp;
  }

  peak() {
    if (this.container.length === 0) return null;
    return this.container[0];
  }

  push(value) {
    this.container.push(value);
  }

  pop() {
    return this.container.shift();
  }

  kthValues(kValue) {
    const values = [];

    while (this.container.length > 0 && values.length < kValue) {
      values.push(this.pop());
    }

    return values;
  }
}

class MaxHeap extends Heap {
  push(value) {
    this.container.push(value);

    let index = this.container.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (parentIndex >= 0 && this.compareValue(parentIndex, index) < 0) {
      this.swapValues(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  pop() {
    this.swapValues(0, this.container.length - 1);
    const max = this.container.pop();

    let index = 0;
    let maxChildIndex = this.getMaxChildIndex(index);

    while (this.compareValue(index, maxChildIndex) < 0 && maxChildIndex < this.container.length) {
      this.swapValues(index, maxChildIndex);

      index = maxChildIndex;
      maxChildIndex = this.getMaxChildIndex(index);
    }

    return max;
  }
}

class MinHeap extends Heap {
  push(value) {
    this.container.push(value);

    let index = this.container.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (parentIndex >= 0 && this.compareValue(parentIndex, index) > 0) {
      this.swapValues(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  pop() {
    this.swapValues(0, this.container.length - 1);
    const min = this.container.pop();

    let index = 0;
    let minChildIndex = this.getMinChildIndex(index);

    while (this.compareValue(index, minChildIndex) > 0 && minChildIndex < this.container.length) {
      this.swapValues(index, minChildIndex);

      index = minChildIndex;
      minChildIndex = this.getMinChildIndex(index);
    }

    return min;
  }
}

module.exports = {
  Heap,
  MaxHeap,
  MinHeap,
};

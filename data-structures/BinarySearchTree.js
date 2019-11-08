class BinarySearchNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  compareValue(otherValue) {
    if (this.value < otherValue) return -1;
    if (this.value > otherValue) return 1;
    return 0;
  }

  minSuccessor() {
    if (this.left == null) return this;
    return this.left.minSuccessor();
  }

  insert(value) {
    // Insert left
    if (this.compareValue(value) > 0) {
      if (this.left == null) {
        this.left = new BinarySearchNode(value);
      } else {
        this.left.insert(value);
      }

      return;
    }

    // Insert right
    if (this.right == null) {
      this.right = new BinarySearchNode(value);
    } else {
      this.right.insert(value);
    }
  }

  remove(value) {
    // Remove left
    if (this.compareValue(value) > 0) {
      this.left = this.left.remove(value);
      return this;
    }

    // Remove right
    if (this.compareValue(value) < 0) {
      this.right = this.right.remove(value);
      return this;
    }

    // Remove self which is a leaf
    if (this.left == null && this.right == null) {
      delete this;
      return null;
    }

    // Remove self which has only right child
    if (this.left == null) {
      const rightChild = this.right;
      this.value = rightChild.value;
      delete this;
      return rightChild;
    }

    // Remove self which has only left child
    if (this.right == null) {
      const leftChild = this.left;
      this.value = leftChild.value;
      delete this;
      return leftChild;
    }

    // Remove self which has both children
    let minSuccessor = this.right.minSuccessor();
    this.value = minSuccessor.value;
    this.right = this.right.remove(minSuccessor.value);
    return this;
  }

  inOrderTraverse() {
    const leftTraverse = this.left == null ? [] : this.left.inOrderTraverse();
    const rightTraverse = this.right == null ? [] : this.right.inOrderTraverse();
    return [...leftTraverse, this.value, ...rightTraverse];
  }

  print() {
    const leftTraverse = this.left == null ? null : this.left.print();
    const rightTraverse = this.right == null ? null : this.right.print();

    return {
      value: this.value,
      left: leftTraverse,
      right: rightTraverse,
    };
  }
}

class BinarySearchTree {
  constructor(values) {
    this.root = null;
    this.buildTree(values);
  }

  buildTree(values) {
    values.forEach(value => {
      if (this.root == null) {
        this.root = new BinarySearchNode(value);
      } else {
        this.root.insert(value);
      }
    });
  }

  insert(value) {
    this.root.insert(value);
  }

  remove(value) {
    this.root.remove(value);
  }

  inOrderTraverse() {
    return this.root.inOrderTraverse();
  }

  toString() {
    return JSON.stringify(this.root.print(), null, 2);
  }
}

module.exports = {
  BinarySearchNode,
  BinarySearchTree,
};

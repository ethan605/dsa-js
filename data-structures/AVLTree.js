class AVLNode {
  static getHeight(node) {
    return node == null ? 0 : node.height;
  }

  constructor(value) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }

  get balance() {
    return AVLNode.getHeight(this.left) - AVLNode.getHeight(this.right);
  }

  compareValue(otherValue) {
    if (this.value < otherValue) return -1;
    if (this.value > otherValue) return 1;
    return 0;
  }

  swapValue(otherNode) {
    const temp = this.value;
    this.value = otherNode.value;
    otherNode.value = temp;
  }

  minSuccessor() {
    if (this.left == null) return this;
    return this.left.minSuccessor();
  }

  insert(value) {
    // Insert left
    if (this.compareValue(value) > 0) {
      if (this.left == null) {
        this.left = new AVLNode(value);
      } else {
        this.left.insert(value);
      }
    } else {
      // Insert right
      if (this.right == null) {
        this.right = new AVLNode(value);
      } else {
        this.right.insert(value);
      }
    }

    this.height = Math.max(AVLNode.getHeight(this.left), AVLNode.getHeight(this.right)) + 1;
    this.rebalance();
  }

  remove(value) {
    // Remove left
    if (this.compareValue(value) > 0) {
      this.left = this.left.remove(value);
      this.rebalance();
      return this;
    }

    // Remove right
    if (this.compareValue(value) < 0) {
      this.right = this.right.remove(value);
      this.rebalance();
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
    this.rebalance();
    return this;
  }

  rebalance() {
    // Still balanced
    if (this.balance >= -1 && this.balance <= 1) return;

    if (this.balance > 1) {
      // if (this.left.value > value) {
      if (this.left.balance > 0) {
        // Left-Left case - rotate right
        this.rotateRight();
      } else {
        // Left-Right case - rotate left at this.left
        this.left.rotateLeft();
        this.rotateRight();
      }
    }

    if (this.balance < -1) {
      // if (this.right.value < value) {
      if (this.right.balance < 0) {
        // Right-Right case - rotate left at this.right
        this.rotateLeft();
      } else {
        // Right-Left case - rotate right at this.right
        this.right.rotateRight();
        this.rotateLeft();
      }
    }

    this.height = Math.max(AVLNode.getHeight(this.left), AVLNode.getHeight(this.right)) + 1;
  }

  rotateLeft() {
    const temp = this.right;

    this.right = temp.right;
    temp.right = temp.left;
    temp.left = this.left;
    this.left = temp;

    this.swapValue(temp);

    temp.height = Math.max(AVLNode.getHeight(temp.left), AVLNode.getHeight(temp.right)) + 1;
  }

  rotateRight() {
    const temp = this.left;

    this.left = temp.left;
    temp.left = temp.right;
    temp.right = this.right;
    this.right = temp;

    this.swapValue(temp);

    temp.height = Math.max(AVLNode.getHeight(temp.left), AVLNode.getHeight(temp.right)) + 1;
  }

  inOrderTraverse() {
    const leftTraverse = this.left == null ? [] : this.left.inOrderTraverse();
    const rightTraverse = this.right == null ? [] : this.right.inOrderTraverse();
    return [...leftTraverse, this.value, ...rightTraverse];
  }

  print() {
    const leftTraverse = this.left == null ? null : this.left.print();
    const rightTraverse = this.right == null ? null : this.right.print();

    const { balance, height, value } = this;

    return {
      value,
      balance,
      height,
      left: leftTraverse,
      right: rightTraverse,
    };
  }
}

class AVLTree {
  constructor(values) {
    this.root = null;
    this.buildTree(values);
  }

  buildTree(values) {
    values.forEach(value => {
      if (this.root == null) {
        this.root = new AVLNode(value);
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
  AVLNode,
  AVLTree,
};

class AVLNode {
  constructor(value) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }

  get leftHeight() {
    return this.left == null ? 0 : this.left.height;
  }

  get rightHeight() {
    return this.right == null ? 0 : this.right.height;
  }

  get balance() {
    return this.leftHeight - this.rightHeight;
  }

  copyNode(otherNode) {
    this.value = otherNode.value;
  }

  minSuccessor() {
    if (this.left == null) return this;
    return this.left.minSuccessor();
  }

  insert(value) {
    // Insert left
    if (this.value > value) {
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

    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
  }

  remove(value) {
    // Remove left
    if (this.value > value) {
      this.left = this.left.remove(value);
      return this;
    }

    // Remove right
    if (this.value < value) {
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
      this.copyNode(rightChild);
      delete this;
      return rightChild;
    }

    // Remove self which has only left child
    if (this.right == null) {
      const leftChild = this.left;
      this.copyNode(leftChild);
      delete this;
      return leftChild;
    }

    // Remove self which has both children
    let minSuccessor = this.right.minSuccessor();
    this.copyNode(minSuccessor);
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
        return;
      }

      this.root.insert(value);
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

function binarySearch() {
  const bst = new AVLTree([10, 1, 3, 5, 4, 6, 13, 9, 8, 15, 17, 11, 12, 18, 16]);
  console.log(bst.inOrderTraverse());
  // console.log(bst.toString());

  bst.insert(14);
  console.log(bst.inOrderTraverse());
  // console.log(bst.toString());

  bst.remove(13);
  console.log(bst.inOrderTraverse());
  console.log(bst.toString());
}

binarySearch();

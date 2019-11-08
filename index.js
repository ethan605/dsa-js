const { AVLTree } = require('./data-structures/AVLTree');
const { BinarySearchTree } = require('./data-structures/BinarySearchTree');
const { MaxHeap, MinHeap } = require('./data-structures/Heaps');

function binarySearch() {
  const bst = new BinarySearchTree([10, 1, 3, 5, 4, 6, 13, 9, 8, 15, 17, 11, 12, 18, 16]);
  console.log(bst.inOrderTraverse());
  // console.log(bst.toString());

  bst.insert(14);
  console.log(bst.inOrderTraverse());
  // console.log(bst.toString());

  bst.remove(13);
  console.log(bst.inOrderTraverse());
  // console.log(bst.toString());
}

function avlSearch() {
  const avl = new AVLTree([10, 1, 3, 5, 4, 6, 13, 9, 8, 15, 17, 11, 12, 18, 16]);
  console.log(avl.inOrderTraverse());
  console.log(avl.toString());

  avl.insert(14);
  avl.insert(12.5);
  avl.insert(14.5);
  console.log(avl.inOrderTraverse());

  avl.remove(10);
  console.log(avl.inOrderTraverse());
}

function heaps() {
  const maxHeap = new MaxHeap([1, 9, 3, 7, 8, 4, 2, 10, 16, 14]);
  console.log(maxHeap.container);
  console.log(maxHeap.kthValues(4));
  console.log(maxHeap.container);

  const minHeap = new MinHeap([1, 9, 3, 7, 8, 4, 2, 10, 16, 14]);
  console.log(minHeap.container);
  console.log(minHeap.kthValues(4));
  console.log(minHeap.container);
}

module.exports = {
  avlSearch,
  binarySearch,
  heaps,
};

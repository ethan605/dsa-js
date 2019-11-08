const AVLTree = require('./data-structures/AVLTree');
const BinarySearchTree = require('./data-structures/BinarySearchTree');

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

  avl.insert(14);
  avl.insert(12.5);
  avl.insert(14.5);
  console.log(avl.inOrderTraverse());

  avl.remove(10);
  console.log(avl.inOrderTraverse());
}

module.exports = {
  avlSearch,
  binarySearch,
};

// binarySearch();
// avlSearch();

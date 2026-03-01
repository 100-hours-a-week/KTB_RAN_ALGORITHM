class Node {
  constructor(index, xpos) {
    this.xpos = xpos;
    this.index = index;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.preArr = []; // 전위 탐색 배열 CLR
    this.postArr = []; // 후위 탐색 배열 LRC
  }

  insert(index, xpos) {
    const newNode = new Node(index, xpos);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (true) {
      if (xpos < currentNode.xpos) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // CLR
  preOrder(node) {
    if (node) {
      this.preArr.push(node.index);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  // LRC
  postOrder(node) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      this.postArr.push(node.index);
    }
  }
}

function solution(treasureLocations) {
  const tree = new BinaryTree();
  const sortedNodes = treasureLocations
    .map((node, i) => [...node, i + 1])
    .sort((a, b) => b[1] - a[1]);

  sortedNodes.forEach((node) => {
    const [xpos, , index] = node;
    tree.insert(index, xpos);
  });

  tree.preOrder(tree.root);
  tree.postOrder(tree.root);

  return [tree.preArr, tree.postArr];
}

console.log(
  solution([
    [6, 4],
    [12, 6],
    [14, 4],
    [4, 6],
    [7, 2],
    [2, 4],
    [9, 7],
    [8, 1],
    [3, 1],
  ])
);
console.log(
  solution([
    [10, 5],
    [5, 7],
    [15, 7],
    [2, 3],
    [7, 3],
    [12, 3],
    [20, 3],
  ])
);

import Node from './node.js';

export default class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr, 0, arr.length - 1);
        this.prettyPrint(this.root);
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if(start > end) return null;

        const mid = parseInt((start + end) / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    insert(root, data) {

        if(root === null) {
            root = new Node(data);
            return root;
        }

        else if(data > root.data)
            root.right = this.insert(root.right, data)
        else if(data < root.data )
            root.right = this.insert(root.left, data);

        return root;
    }

    delete(root, value) {
        // Base case
        console.log(root);
        if (root === null) {
          return root;
        }
  
        // Traverse down the tree
        if (value < root.data) {
          root.left = this.delete(root.left, value);
        } else if (value > root.data) {
          root.right = this.delete(root.right, value);
        } 
  
        // Value matches -> delete node and update pointers
        else {
          // option 1: root(child) has only one child
          if (root.left === null) {
            // return the child's right so new parent can point to it
            return root.right;
          } else if (root.right === null) {
            // return child's left so new parent can point to it
            return root.left;
          }
          // option 2: Node has two children
          else {
            // Replace node with next smallest value
            const minData = function findNextSmallestRightData(root) {
              let min = root.data;
              let newRoot = root;
  
              // Search for a left node with no left children. 
              while (newRoot.left !== null) {
                min = root.left.data;
                newRoot = root.left;
              }
  
              return min;
            }
            console.log(root);
            root.data = minData(root.right);
  
            // Delete the copied node from minData()
            root.right = this.delete(root.data, root.right)
          }
        }
  
        return root;
      }

    //searching for a value and returning
    // the node with that value
    find(root, data) {
        if(data == root.data)
            return root;
        else if(data < root.data) {
            return this.find(root.left, data);
        }
        return this.find(root.right, data);
    }

    //for testing
    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}
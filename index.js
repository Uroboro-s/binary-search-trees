import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


console.log("hello");
const obj = new Tree([1, 2, 3, 4, 6, 8, 9, 9, 15]);
console.log(obj);
console.log(obj.find(obj.root, 9));
console.log(obj.insert(obj.root, 119));

console.log(obj.delete(obj.root, 15));


prettyPrint(obj.root);



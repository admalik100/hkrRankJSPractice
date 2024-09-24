/*
implement a function , inventoryList, such that:

- it maintains the collection of all item names existing in an inventory, where each item is uniquely identified by a name.
- returns a new object, with three methods:
    - add(name) - the string name parameter is passed, and it is added to the collection, items in the collection are distinct.
    - remove(name) - the string name parameter is passed, and this item is removed from the collection if it exists. if it does not exist, nothing happens.
    - getList() - This returns an array of names of items added so far. The names are returned in the order of the corresponding items were added.

    Constraints:
    - The size of the collection will not exceed 10 at any point.
    - All names passed to add(name) and remove(name) are non-empty

    sample input
    3
    add Shirt
    remove Trouser
    getList



*/
"use strict";

const assert = require("assert");
const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function inventoryList() {
  // write code here
  const inventoryOfItems = [];
  return {
    add: (item) => {
      assert(item !== "", "Validate input is non empty");
      assert(
        !inventoryOfItems.includes(item),
        "validate input is not already present in inventory"
      );
      assert(
        inventoryOfItems.length <= 10,
        "Check and validate inventory size is not greater than 10 before adding new item"
      );
      inventoryOfItems.push(item);
    },
    remove: (item) => {
      const itemIndex = inventoryOfItems.indexOf(item);
      if (itemIndex !== -1) {
        inventoryOfItems.splice(itemIndex, 1);
      }
    },
    getList: () => [...inventoryOfItems],
  };
}

function main() {
  const ws = fs.createWriteStream(
    "/Users/mac/Documents/AdMalik/repos/dummy/test.txt"
  );
  //   const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  const obj = inventoryList();
  const operationCount = parseInt(readLine().trim());

  for (let i = 1; i <= operationCount; i++) {
    const operationInfo = readLine().trim().split(" ");
    if (operationInfo[0] === "add") {
      obj.add(operationInfo[1]);
    } else if (operationInfo[0] === "remove") {
      obj.remove(operationInfo[1]);
    } else if (operationInfo[0] === "getList") {
      const res = obj.getList();
      if (res.length === 0) {
        ws.write("No Items\n");
      } else {
        ws.write(`${res.join(",")}\n`);
      }
    }
  }
  ws.end();
}

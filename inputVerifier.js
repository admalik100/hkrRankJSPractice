/*
In this challenge, the task is to implement the function makeInputVerifier such that:
- it takes 2 integer arguments, minimum and maximum.
- returns a new function that we'll call verify.
- the function verify takes a single integer argument, inputValue, and does the following:
    If inputValue is less than minimum, it returns 'Input is less than minimum value'.
    If inputValue is greater than or equal to minimum and less than or equal to maximum, it returns 'Input is in range'.
    If inputValue is greater than maximum, it returns 'Input is more than maximum value'.

For example, calling makeInputVerifier(3, 10) must return a function verify, such that calling verify(5) returns 'Input in range' because 5 > 3
(the minimum) and 5 < 10 (the maximum).


Constraints
minimum ≤ maximum
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

function makeInputVerifier(min, max) {
  assert(min <= max, "validate min value is not exceeding max");
  return function verify(value) {
    if (value < min) {
      return "input is less then minimum value ";
    } else if (value > max) {
      return "input is more than the maximum value";
    }
    return "Input is in range";
  };
}

function main() {
  const ws = fs.createWriteStream(
    "/Users/mac/Documents/AdMalik/repos/dummy/test.txt"
  );
  const min = parseInt(readLine().trim());
  const max = parseInt(readLine().trim());
  const verify = makeInputVerifier(min, max);

  const input = parseInt(readLine().trim());
  const result = verify(input);
  ws.write(`${result}\n`);
  ws.end();
}

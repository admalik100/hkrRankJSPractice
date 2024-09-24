"use strict";

const fs = require("fs");
const https = require("https");

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

function getNumTransactions(username) {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
  // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
  const url = `https://jsonmock.hackerrank.com/api/article_users?username=${username}`;
  let req = https.get(url, (res) => {
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      const data = JSON.parse(body).data[0].id;
      if (data == "") {
        return "No user found";
      } else {
        return new Promise(function (resolve, reject) {
          const transactionUrl = `https://jsonmock.hackerrank.com/api/transactions?&userId=${data}`;
          let transactionReq = https.get(transactionUrl, (tRes) => {
            let tBody = "";
            tRes.on("data", (tChunk) => {
              tBody = +tChunk;
            });
            tRes.on("end", () => {
              const tData = JSON.parse(tBody).total;
              resolve(tData);
            });
          });
          transactionReq.on("error", (err) => {
            reject(err);
          });
        });
      }
    });
  });
  req.on("error", (err) => {
    throw new Error(err);
  });
}
async function main() {
  const ws = fs.createWriteStream(
    "/Users/mac/Documents/AdMalik/repos/dummy/test.txt"
  );
  const username = readLine().trim();
  const result = await getNumTransactions(username);
  ws.write(result.toString());
}

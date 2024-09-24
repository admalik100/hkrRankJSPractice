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
  return new Promise(function (resolve, reject) {
    const url = `https://jsonmock.hackerrank.com/api/article_users?username=${username}`;
    const req = https.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        const data = JSON.parse(body).data[0].id;
        const result = data;
        // resolve(result)
        if (result == "") {
          console.log("Username Not Found");
        } else {
          return new Promise(function (resolve, reject) {
            const transactionsURL = `https://jsonmock.hackerrank.com/api/transactions?&userId=${data}`;
            const req = https.get(transactionsURL, (res) => {
              let transactionsBody = "";
              res.on("data", (chunk) => {
                transactionsBody += chunk;
              });
              res.on("end", () => {
                console.log(transactionsBody);
                const tData = JSON.parse(transactionsBody).total;
                const tResult = tData;
                console.log("T" + tResult);
                resolve(tResult);
              });
            });
            req.on("error", (err) => {
              reject(err);
            });
          });
        }
      });
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}
async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  const username = readLine().trim();
  const result = await getNumTransactions(username);
  ws.write(result.toString());
}

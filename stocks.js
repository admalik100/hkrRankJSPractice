/*

Given a date in the format d-mmmm-yyyy, you have to make a GET call to the given API to get the stock information for this date.

To get the data, make an API GET call to URL 'https://jsonmock.hackerrank.com/api/stocks?date={date}'. For example, for the date 5-January-
2000, the API hit has to be https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000. Please note that the date passed to the URL must not have any leading zeroes in the day.

The response to such a request is a JSON with the following 5 fields:

- page: The current page of the results.
- per_page: The maximum number of results returned per page.
- total: The total number of results.
- total_pages: The total number of pages with results.
- data: Either an empty array or an array with single object containing the stock record with the following schema:
- date - date for which we have queried
- open - open value, which is a number
- high - high value, which is a number
- low - low value, which is a number
- close - close value, which is a number


An example of a stock record is as follows:

{
"date": "5-January-2000",
"open": 5265.09,
"high": 5464.35,
"low": 5184.48,
"close": 5357
}

Please note that you will get the data from page 1. Page 1 is the default page returned on an API hit. No further page hits are required.

Function Description
Complete the function getStockInformation in the editor below.
getStockInformation has the following parameter:
date: the date for which you want to query, in the format d-mmmm-yyyy
Returns:
a Promise that resolves with the stock record object; in the case of an empty array result, the Promise resolves with an empty object
Your implementation of the function will be tested by a stubbed code on several input files. Each input file contains a date parameter for the
functions call. The function getStockInformation will be called with this parameter, and the result of their executions will be printed to the
standard output by the provided code. The stubbed code prints the open, high, low, and close values of the stock as returned by API. In case
the function resolves the promise with an empty object, the stubbed code prints 'No Results Found'.
*/

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

function getStockInformation(date) {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/stocks?date=<date>
  return new Promise(function (resolve, reject) {
    const url = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`;
    const req = https.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        const data = JSON.parse(body).data;
        const result = data.length === 0 ? {} : data[0];
        resolve(result);
      });
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  const ws = fs.createWriteStream(
    "/Users/mac/Documents/AdMalik/repos/dummy/test.txt"
  );
  const date = readLine().trim();
  const result = await getStockInformation(date);
  const isEmpty = !Object.keys(result).length;

  if (isEmpty) {
    ws.write("No Results Found");
  } else {
    ws.write(`Open: ${result.open}\n`);
    ws.write(`High: ${result.high}\n`);
    ws.write(`Low: ${result.low}\n`);
    ws.write(`Close: ${result.close}\n`);
  }
}
